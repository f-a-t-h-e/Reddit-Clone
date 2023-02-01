import {
  Box,
  Divider,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { IPost, postState } from "@/atoms/posts.Atom";
import CommentInput from "./CommentInput";
import type { IComment, IOnCreateComment } from "./types";
import CommentItem from "./CommentItem";
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { useSetRecoilState } from "recoil";

type Props = {
  user?: User | null;
  selectedPost: IPost;
  communityId: string;
};

const Comments = ({ communityId, selectedPost, user }: Props) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const setPostState = useSetRecoilState(postState);
  const [commentText, setCommentText] = useState("");

  const onCreateComment: IOnCreateComment = async ({ text, user }) => {
    setCreateLoading(true);
    try {
      // TO_DO : make add a refrence for the user to his comments

      // start a writeBatch
      const batch = writeBatch(firestore);

      // get a new comment refrence
      const commentDocRef = doc(collection(firestore, "comments"));
      // set the new comment to the commentDocRef reference
      batch.set(commentDocRef, {
        authorId: user.uid,
        authorName: user.displayName || user.email!.split("@")[0],
        postId: selectedPost.id,
        postTitle: selectedPost.title,
        text,
        createdAt: serverTimestamp() as Timestamp,
      } as Omit<IComment, "id">);

      // get the post refrence
      const postDocRef = doc(firestore, "posts", selectedPost.id);
      // update the post using the refernce
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      // commit changes
      await batch.commit();
      // end writeBatch

      // start altering the client's state
      setCommentText("");
      setComments((prev) => [
        {
          id: commentDocRef.id,
          authorId: user.uid,
          authorName: user.displayName || user.email!.split("@")[0],
          postId: selectedPost.id,
          postTitle: selectedPost.title,
          text,
          createdAt: { seconds: Date.now() / 1000 } as Timestamp,
        },
        ...prev,
      ]);
      // TO_DO : whith this implementaion the user can't comment on multiple posts at the same time
      // Hint : after using a (Hash map / Array) for the posts and let the selected post be just a pointer to it's place
      // you will be able to avoid this easily
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...selectedPost,
          numberOfComments: selectedPost.numberOfComments + 1,
        },
      }));
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:26 ~ onCreateComment ~ error", error);
      setCreateLoading(false);
      return false;
    }
    setCreateLoading(false);
    return true;
  };

  const onCommentDelete = async (comment: IComment) => {};

  const getPostComments = async () => {
    setFetchLoading(true);
    try {
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost.id),
        orderBy("createdAt", "desc")
      );

      const commentDocs = await getDocs(commentsQuery);
      const comments = commentDocs.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as IComment)
      );
      setComments(comments);
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:41 ~ getPostComments ~ error", error);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    getPostComments();
    // TO_DO : check if you need to add "selectedPost" as a dependency
  }, []);
  return (
    // TO_DO : use a <Stack />
    <Box bg="white" borderRadius="0px 0px 4px 4px" p="0.5rem">
      <Flex
        direction="column"
        pl="2.5rem"
        pr="1rem"
        mb="1.5rem"
        fontSize="10pt"
        w="100%"
      >
        {!fetchLoading && (
          <CommentInput
            commentText={commentText}
            setCommentText={setCommentText}
            post={selectedPost}
            createLoading={createLoading}
            user={user}
            onCreateComment={onCreateComment}
          />
        )}
      </Flex>
      <Stack spacing={6}>
        {fetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding="6" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Box>
            ))}
          </>
        ) : comments.length ? (
          comments.map((comment, i) => (
            <CommentItem
              key={i}
              comment={comment}
              user={user}
              onCommentDelete={onCommentDelete}
              isLoading={deleteLoading}
            />
          ))
        ) : (
          <>
            <Divider />
            <Text align="center" fontWeight={700} opacity={0.3} p={20}>
              No Comments Yet
            </Text>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Comments;

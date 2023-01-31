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
import { IPost } from "@/atoms/posts.Atom";
import CommentInput from "./CommentInput";
import type { IComment } from "./types";
import CommentItem from "./CommentItem";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";

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

  const onCommentDelete = async (comment: IComment) => {
    // delete comment doc
    // update post numberOfComments -1

    //  update recoil state
    return false;
  };

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
            createLoading={createLoading}
            post={selectedPost}
            user={user}
            setCreateLoading={setCreateLoading}
            setComments={setComments}
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

import { Flex, Textarea, Button, Text, Box } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useState } from "react";
import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";
import { IComment, IOnCreateComment } from "./types";
import { IPost, postState } from "@/atoms/posts.Atom";
import { firestore } from "@/firebase/clientApp";
import {
  collection,
  doc,
  increment,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { useSetRecoilState } from "recoil";

type Props = {
  user?: User | null;
  createLoading: boolean;
  post: IPost;
  setCreateLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
};

const ComentInput = ({
  createLoading,
  post,
  user,
  setCreateLoading,
  setComments,
}: Props) => {
  const setPostState = useSetRecoilState(postState);
  const [commentText, setCommentText] = useState("");
  // TO_DO : update this function parameters to make it independent
  const onCreateComment: IOnCreateComment = async ({ post, text, user }) => {
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
        postId: post.id,
        postTitle: post.title,
        text,
        createdAt: serverTimestamp() as Timestamp,
      } as Omit<IComment, "id">);

      // get the post refrence
      const postDocRef = doc(firestore, "posts", post.id);
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
          postId: post.id,
          postTitle: post.title,
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
          ...post,
          numberOfComments: post.numberOfComments + 1,
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
  return (
    <Flex direction="column">
      {user ? (
        <>
          <Text mb={1}>
            Comment as{" "}
            <Text display="inline-block" style={{ color: "#3182CE" }}>
              {user.displayName || user.email!.split("@")[0]}
            </Text>
          </Text>
          <Box
            border="1px solid transparent"
            borderRadius={4}
            _focusWithin={{
              zIndex: 1,
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px #3182ce",
            }}
            _hover={{
              borderColor: "gray.300",
            }}
          >
            <Textarea
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="What are your thoughts?"
              fontSize="10pt"
              border="none"
              minH="160px"
              borderRadius="4px 4px 0px 0px"
              _placeholder={{ color: "gray.500" }}
              _focus={{
                outline: "none",
                bg: "white",
                border: "none",
                boxShadow: "none",
              }}
            />
            <Flex
              justify="flex-end"
              bg="gray.100"
              p="6px 8px"
              borderRadius="0px 0px 4px 4px"
            >
              <Button
                h="26px"
                isDisabled={!commentText.length}
                isLoading={createLoading}
                onClick={() =>
                  onCreateComment({ post, text: commentText, user })
                }
              >
                Comment
              </Button>
            </Flex>
          </Box>
        </>
      ) : (
        <Flex
          align="center"
          justify="space-between"
          borderRadius={2}
          border="1px solid"
          borderColor="gray.100"
          p={4}
        >
          <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
          <AuthButtons />
        </Flex>
      )}
    </Flex>
  );
};

export default ComentInput;

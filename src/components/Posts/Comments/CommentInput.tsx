import { Flex, Textarea, Button, Text, Box } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useState } from "react";
import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";
import { IOnCreateComment } from "./types";
import { IPost } from "@/atoms/posts.Atom";
import { firestore } from "@/firebase/clientApp";
import {
  collection,
  doc,
  increment,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { Comment } from "./CommentItem";

type Props = {
  user?: User | null;
  createLoading: boolean;
  post: IPost;
  setCreateLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const ComentInput = ({
  createLoading,
  post,
  user,
  setCreateLoading,
  setComments,
}: Props) => {
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
      } as Omit<Comment, "id">);

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
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:26 ~ onCreateComment ~ error", error);
      setCreateLoading(false);
      return false;
    }
    setCreateLoading(false);
    return true;
  };
  return (
    <Flex direction="column" position="relative">
      {user ? (
        <>
          <Text mb={1}>
            Comment as{" "}
            <span style={{ color: "#3182CE" }}>
              {user?.email?.split("@")[0]}
            </span>
          </Text>
          <Textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="What are your thoughts?"
            fontSize="10pt"
            borderRadius={4}
            minHeight="160px"
            pb={10}
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid black",
            }}
          />
          <Flex
            position="absolute"
            left="1px"
            right={0.1}
            bottom="1px"
            justify="flex-end"
            bg="gray.100"
            p="6px 8px"
            borderRadius="0px 0px 4px 4px"
          >
            <Button
              height="26px"
              disabled={!commentText.length}
              isLoading={createLoading}
              onClick={() => onCreateComment({ post, text: commentText, user })}
            >
              Comment
            </Button>
          </Flex>
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

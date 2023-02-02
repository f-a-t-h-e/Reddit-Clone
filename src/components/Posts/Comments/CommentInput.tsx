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
  onCreateComment: IOnCreateComment;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  commentText: string;
  post: IPost;
};

const ComentInput = ({
  createLoading,
  user,
  commentText,
  onCreateComment,
  setCommentText,
  post,
}: Props) => {
  // TO_DO : update this function parameters to make it independent

  return (
    <Flex direction="column">
      {user ? (
        <>
          <Text mb={1}>
            Comment as{" "}
            <span style={{ color: "#3182CE" }}>
              {user.displayName || user.email!.split("@")[0]}
            </span>
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
                  onCreateComment({ text: commentText, user, post })
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

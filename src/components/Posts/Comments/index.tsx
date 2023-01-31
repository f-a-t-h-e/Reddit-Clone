import { Box, Flex, Stack } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { IPost } from "@/atoms/posts.Atom";
import type { Comment } from "./CommentItem";
import CommentInput from "./CommentInput";
import { writeBatch } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";

type Props = {
  user?: User | null;
  selectedPost: IPost;
  communityId: string;
};

const Comments = ({ communityId, selectedPost, user }: Props) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);

  const onCreateComment = async (commentText: string) => {
    // create comment doc
    // update post numberOfComments +1

    //  update recoil state
    return false;
  };

  const onCommentDelete = async (comment: Comment) => {
    // delete comment doc
    // update post numberOfComments -1

    //  update recoil state
    return false;
  };

  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
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
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          user={user}
          createLoading={createLoading}
          onCreateComment={onCreateComment}
        />
      </Flex>
    </Box>
  );
};

export default Comments;

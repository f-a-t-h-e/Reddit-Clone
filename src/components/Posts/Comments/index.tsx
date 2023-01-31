import { Box, Flex, Stack } from "@chakra-ui/react";
import type { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { IPost } from "@/atoms/posts.Atom";
import CommentInput from "./CommentInput";
import type { IComment } from "./types";
import CommentItem from "./CommentItem";

type Props = {
  user?: User | null;
  selectedPost: IPost;
  communityId: string;
};

const Comments = ({ communityId, selectedPost, user }: Props) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);

  const onCommentDelete = async (comment: IComment) => {
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
          createLoading={createLoading}
          post={selectedPost}
          user={user}
          setCreateLoading={setCreateLoading}
          setComments={setComments}
        />
      </Flex>
      <Stack spacing={6}>
        {comments.map((comment, i) => (
          <CommentItem
            key={i}
            comment={comment}
            user={user}
            onCommentDelete={onCommentDelete}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Comments;

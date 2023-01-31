import { Stack } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useEffect } from "react";
import { IPost } from "@/atoms/posts.Atom";

type Props = {
  user?: User | null;
  selectedPost: IPost;
  communityId: string;
};

const Comments = ({ communityId, selectedPost, user }: Props) => {
  const onCreateComment = async (commentText: string) => {};

  const onCommentDelete = async (comment: any) => {};

  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);
  return <Stack spacing="1">Comments</Stack>;
};

export default Comments;

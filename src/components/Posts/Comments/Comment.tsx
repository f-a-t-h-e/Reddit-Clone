import React from "react";

type Props = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => Promise<void>;
  isLoading: boolean;
  userId?: string;
};

const Comment = ({ comment, isLoading, onDeleteComment, userId }: Props) => {
  return <div></div>;
};

export default Comment;

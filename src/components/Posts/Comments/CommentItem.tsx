import React from "react";
import type { IComment } from "./types";

type Props = {
  comment: IComment;
  onDeleteComment: (comment: IComment) => Promise<void>;
  isLoading: boolean;
  userId?: string;
};

const CommentItem = ({
  comment,
  isLoading,
  onDeleteComment,
  userId,
}: Props) => {
  return <div></div>;
};

export default CommentItem;

import { Timestamp } from "firebase/firestore";
import React from "react";

export type Comment = {
  id: string;
  authorId: string;
  authorDisplayText: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

type Props = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => Promise<void>;
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

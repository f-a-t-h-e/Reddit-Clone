import type { User } from "firebase/auth";
import type { IPost } from "@/atoms/posts.Atom";
import type { Timestamp } from "firebase/firestore";

export interface IOnCreateCommentProps {
  user: User;
  text: string;
}
export type IOnCreateComment = (
  props: IOnCreateCommentProps
) => Promise<boolean>;

export interface IComment {
  id: string;
  authorId: string;
  authorName: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
}

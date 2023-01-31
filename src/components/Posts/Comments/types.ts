import { User } from "firebase/auth";
import { IPost } from "../../../atoms/posts.Atom";

export interface IOnCreateCommentProps {
  user: User;
  post: IPost;
  text: string;
}
export type IOnCreateComment = (
  props: IOnCreateCommentProps
) => Promise<boolean>;

import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface IPost {
  id: string;
  communityId: string;
  authorId: string;
  authorName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  communityImageURL?: string;
  // NOTE : You can avoid the need to worry about craetedAt being null because you will use a server & will validate
  createdAt: Timestamp;
}
// TO_DO : Rename to IUserPostsVotes to avoid misunderstanding
// TO_DO : Check adding this to the IPost in the client side only
export interface IPostVote {
  id: string;
  postId: string;
  communityId: string;
  voteValue: number;
}

interface IPostState {
  selectedPost: IPost | null;
  posts: IPost[];
  postVotes: IPostVote[];
}

const defaultPostState: IPostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
};

export const postState = atom<IPostState>({
  key: "POSTS_STATE",
  default: defaultPostState,
});

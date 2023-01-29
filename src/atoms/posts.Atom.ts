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
  createdAt: Timestamp;
}

interface IPostState {
  selectedPost: IPost | null;
  posts: IPost[];
  // postVotes:number
}

const defaultPostState: IPostState = {
  selectedPost: null,
  posts: [],
};

export const postState = atom<IPostState>({
  key: "POSTS_STATE",
  default: defaultPostState,
});

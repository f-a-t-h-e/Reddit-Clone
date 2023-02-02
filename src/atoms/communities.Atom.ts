import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restrictied" | "private";
  createdAt?: Timestamp;
  // make a default url instead of optional
  imageURL?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isMod?: boolean;
  imageURL?: string;
}

interface CommunityState {
  mySnippets: CommunitySnippet[];
  currentCommunity?: Community;
  snippetFetched: boolean;
  // visitedCommunities:
}

export const defaultCommunityState: CommunityState = {
  mySnippets: [],
  snippetFetched: false,
};

export const communityState = atom<CommunityState>({
  key: "COMMUNITIES_STATE",
  default: defaultCommunityState,
});

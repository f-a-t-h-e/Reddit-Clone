import { useRecoilState } from "recoil";
import { postState } from "@/atoms/posts.Atom";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};
  const onPostDelete = async () => {};
  const onSelectedPost = async () => {};
  const getCommunityPostVotes = async () => {};

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onPostDelete,
    getCommunityPostVotes,
    onSelectedPost,
  };
};

export default usePosts;

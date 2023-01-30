import { useRecoilState } from "recoil";
import { IPost, postState } from "@/atoms/posts.Atom";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../firebase/clientApp";
import { deleteDoc, doc } from "firebase/firestore";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};
  const onPostDelete = async (post: IPost): Promise<boolean> => {
    try {
      // Check if there is an image to remove it
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/imageURL`);
        await deleteObject(imageRef);
      }

      const postDocRef = doc(firestore, "posts", post.id);
      await deleteDoc(postDocRef);

      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter(({ id }) => id !== post.id),
      }));
    } catch (error) {
      return false;
    }
    return true;
  };
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

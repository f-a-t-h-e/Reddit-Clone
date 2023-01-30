import { useRecoilState, useRecoilValue } from "recoil";
import { deleteObject, ref } from "firebase/storage";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

import { auth, firestore, storage } from "@/firebase/clientApp";
import { IPost, IPostVote, postState } from "@/atoms/posts.Atom";
import { Community, communityState } from "@/atoms/communities.Atom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCallback, useEffect } from "react";

const usePosts = () => {
  const [user] = useAuthState(auth);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const { currentCommunity } = useRecoilValue(communityState);
  // TO_DO : this is supposed to be handled from the server not here
  /**
   * This function implementation is temporary till adding server endpoints
   * @param post the post to vote on
   * @param voteValue the value of the button clicked
   * @param communityId the community of that post
   * @returns Promise<true> if success Promise<false> if failed or user is not logged in
   */
  const onVote = async (
    post: IPost,
    voteValue: 1 | -1,
    communityId: Community["id"]
  ) => {
    if (!user) {
      // TO_DO : handle this
      return false;
    }

    try {
      const { voteStatus } = post;
      let voteIndex = -1;

      const batch = writeBatch(firestore);
      const updatedPost = { ...post };
      let postIndex: number = -1;
      const updatedPosts = postStateValue.posts.map((value, index) => {
        if (value.id === updatedPost.id) {
          postIndex = index;
        }
        return value;
      });
      // Hint : These postVotes is related to the current user
      let updatedPostVotes = postStateValue.postVotes.map((value, index) => {
        if (value.postId === post.id) {
          voteIndex = index;
        }
        return value;
      });
      let voteValueChange: 2 | 1 | -1 | -2 = voteValue;

      // The user has no votes on this post
      if (voteIndex === -1) {
        // create a new postVote docment
        const postVoteRef = doc(
          collection(firestore, "users", `${user.uid}/postVotes`)
        );

        const newVote: IPostVote = {
          id: postVoteRef.id,
          postId: post.id,
          communityId,
          voteValue, // 1 or -1
        };

        // Edit to Firestore
        batch.set(postVoteRef, newVote);

        updatedPost.voteStatus = voteStatus + voteValue;
        updatedPostVotes.push(newVote);
      } else {
        const existingVote = postStateValue.postVotes[voteIndex];
        const postVoteRef = doc(
          firestore,
          "users",
          `${user.uid}/postVotes/${existingVote.id}`
        );
        // removing the vote
        if (existingVote.voteValue === voteValue) {
          updatedPost.voteStatus = voteStatus - voteValue;
          updatedPostVotes.splice(voteIndex, 1);
          // Edit to Firestore
          batch.delete(postVoteRef);
          // to remove the vote we need its opposite value to be added
          voteValueChange *= -1;
        }
        // make it opposite
        else {
          updatedPost.voteStatus = voteStatus + 2 * voteValue;

          updatedPostVotes[voteIndex] = {
            ...existingVote,
            voteValue, // 1 or -1
          };
          // Edit to Firestore
          batch.update(postVoteRef, { voteValue });
          voteValueChange = (2 * voteValue) as 2 | 1 | -1 | -2;
        }
      }
      const postDocRef = doc(firestore, "posts", post.id);
      // batch.update(postDocRef, {voteStatus: increment(voteValueChange)})
      batch.update(postDocRef, { voteStatus: voteStatus + voteValueChange });

      // comit updates to Firestore
      await batch.commit();
      /**
       * start updating the state
       */
      updatedPosts[postIndex] = updatedPost;
      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      }));
      return true;
    } catch (error) {
      console.log("🚀 ~ file: usePosts.ts:32 ~ onVote ~ error", error);
      return false;
    }
  };
  const onPostDelete = async (post: IPost): Promise<boolean> => {
    try {
      // Check if there is an image to remove it
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      const postDocRef = doc(firestore, "posts", post.id);
      await deleteDoc(postDocRef);

      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter(({ id }) => id !== post.id),
      }));
    } catch (error) {
      console.log("🚀 ~ file: usePosts.ts:27 ~ onPostDelete ~ error", error);

      return false;
    }
    return true;
  };
  const onSelectedPost = async () => {};
  const getCommunityPostVotes = useCallback(
    async (communityId: Community["id"]) => {
      if (!user) {
        setPostStateValue((prev) => ({
          ...prev,
          postVotes: [],
        }));
        return true;
      }
      try {
        const userPostsVotesQuery = query(
          collection(firestore, "users", `${user.uid}/postVotes`),
          where("communityId", "==", communityId)
        );
        const userPostsVotesDocs = await getDocs(userPostsVotesQuery);

        const userPostsVotes = userPostsVotesDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IPostVote[];

        setPostStateValue((prev) => ({
          ...prev,
          postVotes: userPostsVotes,
        }));
        return true;
      } catch (error) {
        console.log(
          "🚀 ~ file: usePosts.ts:162 ~ getCommunityPostVotes ~ error",
          error
        );
        return false;
      }
    },
    [setPostStateValue, user]
  );

  useEffect(() => {
    if (!currentCommunity) return;
    getCommunityPostVotes(currentCommunity.id);
  }, [currentCommunity, getCommunityPostVotes]);
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

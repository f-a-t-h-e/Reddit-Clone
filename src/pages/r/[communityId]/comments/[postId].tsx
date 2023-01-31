import React, { useEffect } from "react";
import PageConentLayout from "@/components/Layout/PageConent";
import PostItem from "@/components/Posts/PostItem";
import usePosts from "@/hooks/usePosts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { useRouter } from "next/router";
import { IPost } from "@/atoms/posts.Atom";
import { doc, getDoc } from "firebase/firestore";
import About from "@/components/Community/About";
import useCommunityData from "@/hooks/useCommunityData";
import Comments from "@/components/Posts/Comments";

type Props = {};

const PostPage = ({}: Props) => {
  const {
    getCommunityPostVotes,
    onPostDelete,
    // onSelectedPost,
    onVote,
    postStateValue,
    setPostStateValue,
  } = usePosts();
  const { communityStateValue } = useCommunityData();
  const [user] = useAuthState(auth);
  const router = useRouter();

  const fetchPage = async (postId: IPost["id"]): Promise<boolean> => {
    try {
      const postDocRef = doc(firestore, "posts", postId);
      const postDoc = await getDoc(postDocRef);
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as IPost,
      }));
      return true;
    } catch (error) {
      console.log("🚀 ~ file: [postId].tsx:29 ~ fetchPage ~ error", error);
      return false;
    }
  };

  useEffect(() => {
    const { postId } = router.query;
    // NOTE : Don't redirect besed on the query because it gets loaded later

    if (postId && !postStateValue.selectedPost) {
      fetchPage(postId as string);
    }
  }, [router, postStateValue.selectedPost]);

  return (
    <PageConentLayout>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            onVote={onVote}
            onPostDelete={onPostDelete}
            userVoteValue={
              postStateValue.postVotes.find(
                // TO_DO : fix this.
                (vote) => vote.postId === postStateValue.selectedPost?.id
              )?.voteValue || 0
            }
            userIsAuther={
              (user && user.uid === postStateValue.selectedPost.authorId) ||
              false
            }
            // onSelectedPost={onSelectedPost}
          />
        )}

        <Comments />
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageConentLayout>
  );
};

export default PostPage;

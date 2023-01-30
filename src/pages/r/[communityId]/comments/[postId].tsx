import React from "react";
import PageConentLayout from "@/components/Layout/PageConent";
import PostItem from "@/components/Posts/PostItem";
import usePosts from "@/hooks/usePosts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

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
  const [user] = useAuthState(auth);
  // if no selected post set loading till setting it ?
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

        {/* <Comments /> */}
      </>
      <>{/* <About /> */}</>
    </PageConentLayout>
  );
};

export default PostPage;

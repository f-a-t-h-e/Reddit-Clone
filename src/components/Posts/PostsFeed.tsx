import { User } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Community } from "@/atoms/communities.Atom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { IPost } from "../../atoms/posts.Atom";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { Stack } from "@chakra-ui/react";
import PostLoader from "./PostLoader";

type Props = {
  communityData: Community;
  // user?: User;
};

const PostsFeed = ({ communityData }: Props) => {
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const {
    postStateValue,
    setPostStateValue,
    onPostDelete,
    onVote,
    onSelectedPost,
  } = usePosts();

  const getPosts = async () => {
    setLoading(true);
    try {
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPostStateValue((prev) => ({ ...prev, posts: posts as IPost[] }));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
    // TO_DO : fix this, it has a solution.
  }, []);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((post, i) => (
            <PostItem
              key={i}
              userIsAuther={!!user && post.authorId === user.uid}
              post={post}
              onPostDelete={onPostDelete}
              onVote={onVote}
              onSelectedPost={onSelectedPost}
              userVoteValue={undefined}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default PostsFeed;

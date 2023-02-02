import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { NextPage } from "next";
import PageConentLayout from "@/components/Layout/PageConent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { communityState } from "@/atoms/communities.Atom";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { IPost } from "@/atoms/posts.Atom";
import usePosts from "@/hooks/usePosts";
import PostLoader from "@/components/Posts/PostLoader";
import { Stack } from "@chakra-ui/react";
import PostItem from "../components/Posts/PostItem";
import CreatePostLink from "../components/Community/CreatePostLink";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const communityStateValue = useRecoilValue(communityState);
  const {
    postStateValue,
    onPostDelete,
    onSelectedPost,
    onVote,
    setPostStateValue,
  } = usePosts();

  const buildUserHomeFeed = async () => {
    setLoading(true);

    try {
      if (communityStateValue.mySnippets.length) {
        const userCommunityIds = communityStateValue.mySnippets.map(
          (snip) => snip.communityId
        );

        const postsQuery = query(
          collection(firestore, "posts"),
          where("communityId", "in", userCommunityIds),
          limit(10)
        );
        const postDocs = await getDocs(postsQuery);

        const posts = postDocs.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as IPost)
        );

        setPostStateValue((prev) => ({
          ...prev,
          posts,
        }));
      } else {
        return buildVisitorHomeFeed();
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: index.tsx:31 ~ buildVisitorHomeFeed ~ error",
        error
      );
    }

    setLoading(false);
  };

  const buildVisitorHomeFeed = async () => {
    setLoading(true);

    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as IPost)
      );

      setPostStateValue((prev) => ({
        ...prev,
        posts,
      }));
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:23 ~ buildUserHomeFeed ~ error", error);
    }

    setLoading(false);
  };

  const getUserHostVotes = () => {};

  // useEffects
  useEffect(() => {
    if (!user && !loadingUser) buildVisitorHomeFeed();
  }, [user, loadingUser]);

  return (
    <PageConentLayout>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
                key={post.id}
                onPostDelete={onPostDelete}
                onVote={onVote}
                post={post}
                userIsAuther={post.authorId === user?.uid}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (vote) => vote.postId === post.id
                  )?.voteValue || 0
                }
                homePage
                onSelectedPost={onSelectedPost}
              />
            ))}
          </Stack>
        )}
      </>
      <>{/* Recomendattions */}</>
    </PageConentLayout>
  );
};

export default Home;

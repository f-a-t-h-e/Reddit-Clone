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
import { IPost, IPostVote } from "@/atoms/posts.Atom";
import usePosts from "@/hooks/usePosts";
import PostLoader from "@/components/Posts/PostLoader";
import { Stack } from "@chakra-ui/react";
import PostItem from "@/components/Posts/PostItem";
import CreatePostLink from "@/components/Community/CreatePostLink";
import useCommunityData from "@/hooks/useCommunityData";
import Recommendations from "@/components/Community/Recommendations";
import Premium from "../components/Community/Premium";
import PersonalHome from "../components/Community/PersonalHome";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { communityStateValue } = useCommunityData();
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

  const getUserHostVotes = async () => {
    try {
      // TO_DO : merging this state propperly will decrease the Big(O) of this
      // to allow fetching only unavailable data
      const postIds = postStateValue.posts.map((post) => post.id);
      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where("postId", "in", postIds)
      );

      const postVoteDocs = await getDocs(postVotesQuery);
      const postVotes = postVoteDocs.docs.map(
        (vote) =>
          ({
            id: vote.id,
            ...vote.data(),
          } as IPostVote)
      );

      setPostStateValue((prev) => ({
        ...prev,
        postVotes,
      }));
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:112 ~ getUserHostVotes ~ error", error);
    }
  };

  // useEffects
  useEffect(() => {
    if (!user && !loadingUser) buildVisitorHomeFeed();
  }, [user, loadingUser]);

  useEffect(() => {
    if (communityStateValue.snippetFetched) buildUserHomeFeed();
  }, [user, communityStateValue.snippetFetched]);

  useEffect(() => {
    if (user && postStateValue.posts.length) getUserHostVotes();
    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [user, postStateValue.posts]);

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
      <Stack spacing={5}>
        <Recommendations />
        {/* TO_DO : Add functionality to these sections */}
        <Premium />
        <PersonalHome />
      </Stack>
    </PageConentLayout>
  );
};

export default Home;

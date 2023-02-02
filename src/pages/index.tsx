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
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { IPost } from "@/atoms/posts.Atom";
import usePosts from "@/hooks/usePosts";
import PostLoader from "@/components/Posts/PostLoader";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const communityStateValue = useRecoilValue(communityState);
  const { setPostStateValue } = usePosts();

  const buildUserHomeFeed = async () => {
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

  const buildVisitorHomeFeed = async () => {
    setLoading(true);
    try {
    } catch (error) {
      console.log(
        "🚀 ~ file: index.tsx:31 ~ buildVisitorHomeFeed ~ error",
        error
      );
    }
    setLoading(false);
  };

  const getUserHostVotes = () => {};

  // useEffects
  useEffect(() => {
    if (!user && !loadingUser) buildVisitorHomeFeed();

    return () => {};
  }, [user, loadingUser]);

  return (
    <PageConentLayout>
      <>{/* <PostsFeed /> */}</>
      <>{/* Recomendattions */}</>
    </PageConentLayout>
  );
};

export default Home;

import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { NextPage } from "next";
import PageConentLayout from "@/components/Layout/PageConent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { communityState } from "@/atoms/communities.Atom";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const communityStateValue = useRecoilValue(communityState);

  const buildUserHomeFeed = async () => {
    setLoading(true);
    try {
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

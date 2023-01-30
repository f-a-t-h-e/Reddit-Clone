import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import safeJsonStringify from "safe-json-stringify";

import { Community, communityState } from "@/atoms/communities.Atom";
import { firestore } from "@/firebase/clientApp";
import CommunityNotFound from "@/components/Community/NotFound";
import CommunityHeader from "@/components/Community/Header";
import PageConentLayout from "@/components/Layout/PageConent";
import CreatePostLink from "@/components/Community/CreatePostLink";
import PostsFeed from "@/components/Posts/PostsFeed";
import { useSetRecoilState } from "recoil";
import About from "@/components/Community/About";

type Props = {
  communityData: Community;
};

const CommunityPage = ({ communityData }: Props) => {
  const setCommunityStateValue = useSetRecoilState(communityState);
  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
    // TO_DO : check if you should add dependencies
  }, []);
  if (!communityData) {
    return <CommunityNotFound />;
  }
  // NOTE : We are using communityData instead of currentCommunity
  // on the community state BECAUSE it uses SSR
  return (
    <>
      <CommunityHeader communityData={communityData} />
      <PageConentLayout>
        <>
          <CreatePostLink />
          <PostsFeed communityData={communityData} />
        </>
        <>
          <About communityData={communityData} />
        </>
      </PageConentLayout>
    </>
  );
};

// Routing staff
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      ctx.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              // needed for (Date) type
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    // TO_DO Add an Error Page
    console.log("getServerSideProps error - [community]", error);
    return {
      props: {},
    };
  }
}

export default CommunityPage;

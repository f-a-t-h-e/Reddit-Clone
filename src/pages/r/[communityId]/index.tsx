import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import safeJsonStringify from "safe-json-stringify";

import { Community } from "@/atoms/communities.Atom";
import { firestore } from "@/firebase/clientApp";
import CommunityNotFound from "@/components/Community/NotFound";
import CommunityHeader from "@/components/Community/Header";
import PageConentLayout from "@/components/Layout/PageConent";
import CreatePostLink from "@/components/Community/CreatePostLink";

type Props = {
  communityData?: Community;
};

const CommunityPage = ({ communityData }: Props) => {
  if (!communityData) {
    return <CommunityNotFound />;
  }
  return (
    <>
      <CommunityHeader communityData={communityData} />
      <PageConentLayout>
        <>
          <CreatePostLink />
        </>
        <></>
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

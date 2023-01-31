import React, { useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import { Box, Text } from "@chakra-ui/react";

import NewPostForm from "@/components/Posts/PostForm/NewPostForm";
import PageConentLayout from "@/components/Layout/PageConent";
import { communityState } from "@/atoms/communities.Atom";
import About from "../../../components/Community/About";

type Props = {};

const SubmitPostPage = ({}: Props) => {
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilValue(communityState);
  const router = useRouter();

  useEffect(() => {
    if (!communityStateValue.currentCommunity) {
      router.push("/r/");
    } else if (!user && communityStateValue.currentCommunity.id) {
      // TO_DO : Open authModal instead
      router.push(`/r/${communityStateValue.currentCommunity.id}`);
    }
  }, [user, communityStateValue.currentCommunity, router]);
  return (
    <PageConentLayout>
      <>
        <Box p="14px 0px" borderBottom="1px solid " borderColor="white">
          <Text>Create a Post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageConentLayout>
  );
};

export default SubmitPostPage;

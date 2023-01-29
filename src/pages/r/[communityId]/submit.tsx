import React from "react";
import PageConentLayout from "@/components/Layout/PageConent";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "@/components/Posts/PostForm/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

type Props = {};

const SubmitPostPage = (props: Props) => {
  const [user] = useAuthState(auth);
  return (
    <PageConentLayout>
      <>
        <Box p="14px 0px" borderBottom="1px solid " borderColor="white">
          <Text>Create a Post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <></>
    </PageConentLayout>
  );
};

export default SubmitPostPage;

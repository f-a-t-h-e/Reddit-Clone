import React from "react";
import PageConentLayout from "@/components/Layout/PageConent";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "@/components/Posts/PostForm/NewPostForm";

type Props = {};

const SubmitPostPage = (props: Props) => {
  return (
    <PageConentLayout>
      <>
        <Box p="14px 0px" borderBottom="1px solid " borderColor="white">
          <Text>Create a Post</Text>
        </Box>
        <NewPostForm />
      </>
      <></>
    </PageConentLayout>
  );
};

export default SubmitPostPage;

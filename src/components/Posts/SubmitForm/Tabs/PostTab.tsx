import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";
import type { IPostTabProps } from "../../types";

const PostTab = ({
  onChange,
  handleCreatePost,
  loading,
  inputs,
}: IPostTabProps) => {
  return (
    <Stack spacing={3} w="100%">
      <Input
        name="title"
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
        //
        value={inputs.title}
        onChange={onChange}
      />
      <Textarea
        name="body"
        fontSize="10pt"
        borderRadius={4}
        placeholder="Text (optional)"
        h="100px"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
        //
        value={inputs.body}
        onChange={onChange}
      />
      <Flex justify="end">
        <Button
          height="34px"
          padding="0px 30px"
          isDisabled={!inputs.title}
          onClick={handleCreatePost}
          isLoading={loading}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};

export default PostTab;

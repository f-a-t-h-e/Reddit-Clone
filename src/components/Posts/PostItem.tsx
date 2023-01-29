import React, { useState } from "react";
import {
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
// import moment from "moment";
import { NextRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

import type { IPost } from "@/atoms/posts.Atom";

type Props = {
  post: IPost;
  userIsAuther: boolean;
  userVoteValue?: 1 | -1 | 0;
  onVote: () => {};
  onPostDelete: () => {};
  onSelectedPost: () => {};
};

const PostItem = ({
  post,
  onPostDelete,
  onSelectedPost,
  onVote,
  userIsAuther,
  userVoteValue,
}: Props) => {
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.300"
      borderRadius={4}
      _hover={{
        borderColor: "gray.500",
      }}
      cursor="pointer"
      onClick={() => onSelectedPost}
    >
      <Flex
        direction="column"
        align="center"
        bg="gray.100"
        p={2}
        w="40px"
        borderRadius={4}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          cursor="pointer"
        />
        <Text fontSize="9pt">{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379FF" : "gray.400"}
          fontSize={22}
          cursor="pointer"
        />
      </Flex>
      {post.title}
    </Flex>
  );
};

export default PostItem;

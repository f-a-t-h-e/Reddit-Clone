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
  userVoteValue?: boolean;
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
    <Flex border="1px solid" bg="white">
      {post.title}
    </Flex>
  );
};

export default PostItem;

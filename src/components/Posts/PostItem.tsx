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
import moment from "moment";
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
  onPostDelete: (post: IPost) => Promise<boolean>;
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
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeletionLoading, setIsDeletionLoading] = useState(false);

  const handleDelete = async () => {
    setIsDeletionLoading(true);
    try {
      const success = await onPostDelete(post);
      if (!success) {
        throw new Error("Couldn't delete the post...");
      }
    } catch (error: any) {
      console.log("handleDelete at PostItem component ", error);

      setError(error.message || error);
    }
    setIsDeletionLoading(false);
  };

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
      {/* start VOTE */}
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
      {/* end VOTE */}
      <Flex direction="column" width="100%">
        <Stack spacing={1} p="10px 10px">
          <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
            {/* Check for Home Page */}
            <Text>
              Posted by u/{post.authorName}{" "}
              {moment(new Date(post.createdAt.seconds * 1000)).fromNow(false)}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="10pt">{post.body}</Text>
          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {/* TO_DO : make this alt dynamic */}
              {isImageLoading && (
                <Skeleton h="200px" w="100%" borderRadius={4} />
              )}
              <Image
                src={post.imageURL}
                alt={"post image"}
                // TO_DO : "this is to prevent flashing when the image gets loaded ?"
                display={isImageLoading ? "none" : "unset"}
                onLoad={() => setIsImageLoading(false)}
              />
            </Flex>
          )}
        </Stack>
        {/* start REACTIONS */}
        <Flex ml="1" mb="0.5" color="gray.500">
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr="2" />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr="2" />
            <Text fontSize="9pt">Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr="2" />
            <Text fontSize="9pt">Save</Text>
          </Flex>
          {userIsAuther && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={() => handleDelete()}
            >
              {isDeletionLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr="2" />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
        {/* end REACTIONS */}
      </Flex>
    </Flex>
  );
};

export default PostItem;

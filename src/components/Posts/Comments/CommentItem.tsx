import React from "react";
import type { IComment } from "./types";

import moment from "moment";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";

type Props = {
  comment: IComment;
  user?: User | null;
  onCommentDelete: (comment: IComment) => Promise<boolean>;
  isLoading: boolean;
};

const CommentItem = ({ comment, user }: Props) => {
  return (
    <Flex>
      <Box mr={2}>
        <Icon as={FaReddit} fontSize={30} color="gray.300" />
      </Box>
      <Stack spacing={1}>
        <Stack direction="row" align="center" fontSize="8pt">
          <Text fontWeight={700}>{comment.authorName}</Text>
          <Text color="gray.600">
            {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
          </Text>
        </Stack>
        <Text fontSize="10pt">{comment.text}</Text>
        <Stack direction="row" align="center" cursor="pointer" color="gray.500">
          <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} />
          {user && user.uid === comment.authorId && (
            <>
              {/* TO_DO : Redesign the structure of components to allow mutation */}
              <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
                Edit
              </Text>
              <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
                Delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};

export default CommentItem;

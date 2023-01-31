import React from "react";
import type { IComment } from "./types";

import moment from "moment";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";

type Props = {
  comment: IComment;
  onDeleteComment: (comment: IComment) => Promise<void>;
  isLoading: boolean;
  userId?: string;
};

const CommentItem = ({
  comment,
  isLoading,
  onDeleteComment,
  userId,
}: Props) => {
  return (
    <Flex>
      <Box mr={2}>
        <Icon as={FaReddit} />
      </Box>
      <Stack spacing={1}>
        <Stack direction="row" align="center" fontSize="8pt">
          <Text>{comment.authorName}</Text>
          <Text>
            {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default CommentItem;

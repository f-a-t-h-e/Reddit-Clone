import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type Props = {};

const CommunityNotFound = (props: Props) => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      minH="100%"
      bg="black"
      color="white"
    >
      Sorry, that community does not exist or has been deleted
      <Link href="/">
        <Button mt="4rem">GO HOME</Button>
      </Link>
    </Flex>
  );
};

export default CommunityNotFound;

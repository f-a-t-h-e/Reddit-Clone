import { Flex } from "@chakra-ui/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const PageConentLayout = ({ children }: Props) => {
  return (
    <Flex justify="center" p="16px 0px">
      <Flex w="95%" justify="center" maxW="860px" gap="6">
        <Flex direction="column" w={{ base: "100%", md: "65%" }}>
          {children && children[0 as keyof typeof children]}
        </Flex>
        <Flex
          direction="column"
          display={{ base: "none", md: "Flex" }}
          grow="1"
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageConentLayout;

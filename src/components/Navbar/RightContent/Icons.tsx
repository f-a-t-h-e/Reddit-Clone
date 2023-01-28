import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon as ChakraIcon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { User } from "firebase/auth";
import type { IconType } from "react-icons";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";

type Props = {
  user: User;
};
type IconProps = {
  as: IconType;
  fontSize?: any;
  display?: any;
};

const Icon = ({ as, fontSize = 20, display }: IconProps) => {
  return (
    <Flex
      display={display}
      mr={1.5}
      ml={1.5}
      p={1}
      cursor="pointer"
      borderRadius={4}
      _hover={{ bg: "gray.200" }}
    >
      <ChakraIcon as={as} fontSize={fontSize} />
    </Flex>
  );
};

const Icons = (props: Props) => {
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Icon as={BsArrowUpRightCircle} />
        <Icon as={IoFilterCircleOutline} fontSize={22} />
        <Icon as={IoVideocamOutline} fontSize={22} />
      </Flex>
      <>
        <Icon as={BsChatDots} />
        <Icon as={IoNotificationsOutline} />
        <Flex
          display={{ base: "none", md: "flex" }}
          mr={1.5}
          ml={1.5}
          p={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          onClick={() => {}}
        >
          <ChakraIcon as={GrAdd} fontSize={20} />
        </Flex>
      </>
    </Flex>
  );
};

export default Icons;

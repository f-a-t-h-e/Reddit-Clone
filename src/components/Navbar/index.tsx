import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent";
import SearchInput from "./SearchInput";

type Props = {};

function Navbar({}: Props) {
  return (
    <Flex bg="white" height="46px" padding="6px 12px">
      {/* Logo */}
      <Flex align="center">
        <Image
          src="/images/redditFace.svg"
          alt="redit-logo-face"
          height="30px"
        />
        <Image
          src="/images/redditText.svg"
          alt="redit-logo-text"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {/* {/* <Directory/> */}
      <SearchInput />
      <RightContent />
    </Flex>
  );
}

export default Navbar;

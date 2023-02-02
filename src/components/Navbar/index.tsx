import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import RightContent from "./RightContent";
import SearchInput from "./SearchInput";
import Directory from "./Directory";
import useDirectoryData from "@/hooks/useDirectoryData";
import { defaultMenuItem } from "@/atoms/directoryMenu.Atom";

type Props = {};

function Navbar({}: Props) {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectoryData();

  return (
    <Flex
      bg="white"
      height="46px"
      padding="6px 12px"
      minWidth="fit-content"
      // TO_DO : NOTE : make this justify="end" to fix (too small screen width) issue
      justify="space-between"
    >
      {/* Logo */}
      <Flex
        align="center"
        minWidth={{ base: "fit-content", md: "auto" }}
        mr={{ base: 1, md: 2 }}
        cursor="pointer"
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
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
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
}

export default Navbar;

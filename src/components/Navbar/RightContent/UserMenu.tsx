import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";

import { FaRedditSquare } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";

import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { communityState } from "@/atoms/communities.Atom";

type Props = {
  user?: User | null;
};

const UserMenu = ({ user }: Props) => {
  const setModalState = useSetRecoilState(authModalState);
  // TO_DO Remove this, @/hooks/useCommunityData/()=>{}:useCommunityData/useEffect .
  const resetCommunityState = useResetRecoilState(communityState);

  const logOut = async () => {
    await signOut(auth);
    // TO_DO Remove this, @/hooks/useCommunityData/()=>{}:useCommunityData/useEffect .
    resetCommunityState();
  };

  return (
    <Menu>
      <MenuButton
        aria-label="Options"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          {/* <Flex align="center"> */}
          {user ? (
            <>
              <Icon fontSize={24} mr={1} color="gray.300" as={FaRedditSquare} />
              <Box
                display={{ base: "none", lg: "flex" }}
                flexDirection="column"
                fontSize="8pt"
                alignItems="flex-start"
                mr={8}
              >
                <Text fontWeight={700}>
                  {user.displayName || user.email?.split("@")[0]}
                </Text>
                <Flex alignItems="center">
                  <Icon as={IoSparkles} color="brand.100" mr={1} />
                  <Text color="gray.400">1 karma</Text>
                </Flex>
              </Box>
            </>
          ) : (
            <Icon as={VscAccount} fontSize={24} color="gray.400" mr={1} />
          )}
          {/* </Flex> */}
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              icon={<CgProfile fontSize={20} />}
              command="⌘I"
            >
              Profile
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              icon={<MdOutlineLogout fontSize={20} />}
              command="⌘O"
              onClick={() => logOut()}
            >
              Log Out
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              icon={<MdOutlineLogin fontSize={20} />}
              command="⌘I"
              onClick={() =>
                setModalState((prev) => ({
                  ...prev,
                  open: true,
                  view: "login",
                }))
              }
            >
              Log In / Sign Up
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;

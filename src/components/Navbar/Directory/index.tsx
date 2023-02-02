import {
  AddIcon,
  ChevronDownIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";

import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";

import { CgCommunity, CgProfile } from "react-icons/cg";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { auth } from "@/firebase/clientApp";
import { useRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";
import useDirectoryData from "@/hooks/useDirectoryData";

type Props = {
  user?: User | null;
};

const UserMenu = ({ user }: Props) => {
  const [authModal, setModalState] = useRecoilState(authModalState);
  const { directoryState, toggleMenuOpen } = useDirectoryData();

  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        as={Flex}
        cursor="pointer"
        padding="0px 6px"
        borderRadius="4px"
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        mr={2}
        ml={{ base: 0, md: 2 }}
        onClick={toggleMenuOpen}
        alignItems="center"
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align="center">
            {directoryState.selectedMenuItem.imageURL ? (
              <Image
                src={directoryState.selectedMenuItem.imageURL}
                alt={"community-image"}
                borderRadius="full"
                boxSize={"24px"}
                mr={{ base: 1, md: 2 }}
              />
            ) : (
              <Icon
                as={directoryState.selectedMenuItem.icon}
                fontSize={24}
                mr={{ base: 1, md: 2 }}
              />
            )}

            <Box
              display={{ base: "none", lg: "flex" }}
              flexDirection="column"
              fontSize="10pt"
            >
              <Text fontWeight={600}>
                {directoryState.selectedMenuItem.displayText}
              </Text>
            </Box>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};

export default UserMenu;

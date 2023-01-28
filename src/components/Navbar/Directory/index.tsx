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
  Flex,
  Icon,
  IconButton,
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

type Props = {
  user?: User | null;
};

const UserMenu = ({ user }: Props) => {
  const [authModal, setModalState] = useRecoilState(authModalState);

  return (
    <Menu>
      <MenuButton
        aria-label="Options"
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align="center">
            <Icon as={TiHome} fontSize={24} mr={{ base: 1, md: 2 }} />
            <Box
              display={{ base: "none", lg: "flex" }}
              flexDirection="column"
              fontSize="10pt"
            >
              <Text fontWeight={600}>Home</Text>
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

import { Flex, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import CreateCommunityModal from "../../Modal/CreateCommunity";

type Props = {};

const Communities = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateCommunityModal open={open} onClose={() => setOpen(false)} />
      <MenuItem
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        icon={<GrAdd fontSize={20} />}
        onClick={() => setOpen(true)}
      >
        Create Community
      </MenuItem>
    </>
  );
};

export default Communities;

import { Box, Flex, MenuItem, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { CommunitySnippet, communityState } from "@/atoms/communities.Atom";
import CreateCommunityModal from "@/components/Modal/CreateCommunity";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

type Props = {};

const Communities = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { mySnippets } = useRecoilValue(communityState);

  return (
    <>
      <CreateCommunityModal open={open} onClose={() => setOpen(false)} />
      {mySnippets.find((snip) => snip.isMod) &&
        ((
          <Box mt={3} mb={4}>
            <Text
              pl={3}
              mb={1}
              fontSize="7pt"
              fontWeight={500}
              color="gray.500"
            >
              MODIRATING
            </Text>
            {mySnippets.map(
              (snip) =>
                snip.isMod && (
                  <MenuListItem
                    key={snip.communityId}
                    displayText={`r/${snip.communityId}`}
                    link={`/r/${snip.communityId}`}
                    icon={FaReddit}
                    iconColor="brand.100"
                  />
                )
            )}
          </Box>
        ) ||
          10)}
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          MY COMMUNITIES
        </Text>
        <MenuItem
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          icon={<GrAdd fontSize={20} />}
          onClick={() => setOpen(true)}
        >
          Create Community
        </MenuItem>
        {mySnippets.map((snip, i) => (
          <MenuListItem
            key={i}
            displayText={`r/${snip.communityId}`}
            icon={FaReddit}
            iconColor={"blue.500"}
            link={`/r/${snip.communityId}`}
            imageURL={snip.imageURL}
          />
        ))}
      </Box>
    </>
  );
};

export default Communities;

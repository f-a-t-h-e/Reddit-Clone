import React, { useEffect } from "react";
import { Community } from "@/atoms/communities.Atom";
import { Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import useCommunityData from "@/hooks/useCommunityData";
import { useRouter } from "next/router";

type Props = {
  communityData: Community;
};

const CommunityHeader = ({ communityData }: Props) => {
  const router = useRouter();
  const { communityStateValue, onJoinOrLeaveCommunity, loading, isError } =
    useCommunityData();
  useEffect(() => {
    if (isError === "Community doesn't exist") {
      // TO_DO : remove this with something better and more meaningful
      router.reload();
    }
  }, [isError, router]);
  // will come from the community snippet (From a state)
  const isJoined = !!communityStateValue.mySnippets.find(
    ({ communityId }) => communityId === communityData.id
  );

  return (
    <Flex
      direction="column"
      w="100%"
      h="146px"
      bgGradient="linear-gradient(blue.400 50%, white 50% 100%)"
      justify="end"
      align="center"
      p="16px"
    >
      <Flex w="95%" h="5rem" maxW="860px">
        {communityStateValue.currentCommunity?.imageURL ||
        communityData.imageURL ? (
          <Image
            borderRadius="full"
            boxSize="66px"
            src={
              communityStateValue.currentCommunity?.imageURL ||
              communityData.imageURL
            }
            alt={communityData.id}
            color="blue.500"
            border="4px solid white"
            bg="white"
          />
        ) : (
          <Icon
            as={FaReddit}
            fontSize={64}
            color="blue.500"
            border="3px solid white"
            borderRadius="50%"
            bg="white"
          />
        )}
        <Flex p="30px 16px 0 16px">
          <Flex direction="column" justify="center" mr="6">
            <Text fontWeight="800" fontSize="16pt">
              {communityData.id}
            </Text>
            <Text fontWeight="600" fontSize="10pt" color="gray.400">
              r/{communityData.id}
            </Text>
          </Flex>
          <Button
            variant={isJoined ? "outline" : "solid"}
            height="30px"
            pr={6}
            pl={6}
            onClick={() => {
              onJoinOrLeaveCommunity(communityData, isJoined);
            }}
            isLoading={loading}
          >
            {isJoined ? "Joined" : "Join"}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommunityHeader;

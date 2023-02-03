import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Community } from "@/atoms/communities.Atom";
import { firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import Link from "next/link";
import { FaReddit } from "react-icons/fa";
import { useRouter } from "next/router";

type Props = {};

const Recommendation = (props: Props) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();
  const router = useRouter();

  const getCommunityRecommendations = async () => {
    setLoading(true);
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );

      const communityDocs = await getDocs(communityQuery);
      setCommunities(
        communityDocs.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Community)
        )
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: Recommendation.tsx:10 ~ getCommunityRecommendations ~ error",
        error
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.200"
      // Note : don't delete this or yo will have to add border to the last element of the children or the children...
      overflow="hidden"
    >
      {/* start Banner */}
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        h="70px"
        fontWeight={700}
        // bgImg="url(./images/recCommsArt.png)"
        // bgImg="./images/recCommsArt.png"
        bgSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
        url('images/recCommsArt.png')"
      >
        Top Communities
      </Flex>
      {/* end Banner */}

      <Flex direction="column" gap="1px" bg="gray.200">
        {loading ? (
          <Stack mt={2} p={3}>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
          </Stack>
        ) : (
          <>
            {communities.map((item, i) => {
              const isJoined = !!communityStateValue.mySnippets.find(
                (snip) => snip.communityId === item.id
              );
              return (
                <Flex
                  bg="white"
                  cursor="pointer"
                  pos="relative"
                  key={item.id}
                  fontSize="10pt"
                  // Note : You could remove this and add background to the
                  // parent and use "gap"s
                  //
                  // borderBottom={
                  //   i === communities.length - 1 ? undefined : "1px solid" }
                  // borderColor="gray.200"
                  fontWeight={600}
                  onClick={() => router.push(`/r/${item.id}`)}
                >
                  <Flex
                    align="center"
                    p="10px 12px"
                    w="100%"
                    h="100%"
                    _hover={{ bg: "gray.200" }}
                  >
                    <Flex w="70%" align="center">
                      <Flex w="15%" align="center" justify="center">
                        <Text>{i + 1}</Text>
                      </Flex>
                      <Flex align="center" w="80%">
                        {item.imageURL ? (
                          <Image
                            src={item.imageURL}
                            alt={item.id}
                            borderRadius="full"
                            boxSize="28px"
                            mr="2"
                          />
                        ) : (
                          <Icon
                            as={FaReddit}
                            fontSize={30}
                            color="brand.100"
                            mr="2"
                          />
                        )}
                        <Text
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                        >
                          r/{item.id}
                        </Text>
                      </Flex>
                    </Flex>
                    <Box w="20%"></Box>
                  </Flex>
                  <Button
                    pos="absolute"
                    top="50%"
                    transform="auto"
                    translateY="-50%"
                    right="1"
                    variant={isJoined ? "outline" : "solid"}
                    height="22px"
                    fontSize="8pt"
                    onClick={(e) => {
                      e.stopPropagation();
                      onJoinOrLeaveCommunity(item, isJoined);
                    }}
                    isLoading={loading}
                  >
                    {isJoined ? "Joined" : "Join"}
                  </Button>
                </Flex>
              );
            })}
            {/* TO_DO : Add functionality to this */}
            <Box p="10px 20px">
              <Button h="30px" w="100%">
                View All
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Recommendation;

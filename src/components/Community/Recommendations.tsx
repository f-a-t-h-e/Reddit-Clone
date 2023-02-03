import { Flex } from "@chakra-ui/react";
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

type Props = {};

const Recommendation = (props: Props) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

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
      borderColor="gray.300"
      overflow="hidden"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        h="70px"
        fontWeight={700}
        // bgImg="url(./images/recCommsArt.png)"
        bgImg="./images/recCommsArt.png"
        bgSize="cover"
      >
        Top Communities
      </Flex>
      <Flex></Flex>
    </Flex>
  );
};

export default Recommendation;

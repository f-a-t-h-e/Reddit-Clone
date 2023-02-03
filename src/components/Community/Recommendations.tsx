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
    </Flex>
  );
};

export default Recommendation;

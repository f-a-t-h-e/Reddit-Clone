import React, { useRef } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import { Community } from "@/atoms/communities.Atom";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import { FaReddit } from "react-icons/fa";

type Props = {
  communityData: Community;
};

const About = ({ communityData }: Props) => {
  const [user] = useAuthState(auth);
  const selectedFileRef = useRef(null);

  const { onSelectFile, selectedFile, setSelectedFile } = useSelectFile();
  return (
    <Box pos="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        bg="blue.400"
        color="white"
        p={3}
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex direction="column" p={3} borderRadius="0px 0px 4px 4px" bg="white">
        <Stack>
          {/* start members info */}
          <Flex w="100%" p={2} fontSize="10pt" fontWeight={700}>
            <Flex direction="column" grow={1}>
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>

            <Flex direction="column" grow={1}>
              {/* TO_DO : Make this dynamic */}
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          {/* end members info */}
          <Divider />
          {/* start CreatedAt */}
          <Flex align="center" w="100%" fontWeight={500} fontSize="10pt">
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            {communityData.createdAt && (
              <Text>
                Created{" "}
                {moment(
                  new Date(communityData.createdAt?.seconds * 1000)
                ).format("MMM DD, YYYY")}
              </Text>
            )}
          </Flex>
          {/* end CreatedAt */}
          {/* you can use router.query.communityId */}
          <Link href={`/r/${communityData.id}/submit`}>
            <Button mt={3} h="30px" w="100%">
              Create Post
            </Button>
          </Link>
          {user && user.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize="10pt">
                <Text>Admin</Text>
                <Flex align="center" justify="space-between">
                  <Text
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => {}}
                  >
                    Change Image
                  </Text>
                  {communityData.imageURL ? (
                    <Image
                      borderRadius="full"
                      boxSize="40px"
                      src={communityData.imageURL}
                      alt={communityData.id}
                    />
                  ) : (
                    <Icon
                      as={FaReddit}
                      color="brand.100"
                      borderRadius="full"
                      boxSize="40px"
                      bg="white"
                    />
                  )}
                </Flex>
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default About;

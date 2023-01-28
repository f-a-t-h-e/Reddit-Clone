import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
  type Transaction,
} from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillPersonFill, BsFillEyeFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { auth, firestore } from "@/firebase/clientApp";

type Props = {
  open: boolean;
  onClose: () => void;
};
const format = /^[\w]{3,21}$/;

const CreateCommunityModal = ({ open, onClose }: Props) => {
  const [user] = useAuthState(auth);
  // validation
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [error, setError] = useState("");
  // inputs data
  const [communityName, setCommunityName] = useState("");
  const [communityType, setCommunityType] = useState("public");
  // ui
  const [loading, setLoading] = useState(false);

  const onNameChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!format.test(value)) {
      setError(
        "Community names must be between 3-21 characters, and can only contain letters, numbers, or underscores."
      );
    } else {
      setError("");
    }
    setCommunityName(value);
    setCharsRemaining(21 - value.length);
  };

  async function handleCreateCommunity(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (!format.test(communityName)) {
      return setError(
        "Community names must be between 3-21 characters, and can only contain letters, numbers, or underscores."
      );
    }
    setLoading(true);

    try {
      if (user) {
        const communityDocRef = doc(firestore, "communities", communityName);

        await runTransaction(firestore, async (transaction: Transaction) => {
          const communityDoc = await transaction.get(communityDocRef);
          if (communityDoc.exists()) {
            throw new Error(`Sorry, r/${communityName} is taken. Try another.`);
          }

          // Create the community
          transaction.set(communityDocRef, {
            creatorId: user.uid,
            createdAt: serverTimestamp(),
            numberOfMembers: 1,
            privacyType: communityType,
          });

          // Add the community to the user
          transaction.set(
            doc(
              firestore,
              `users/${user.uid}/communitySnippets`,
              communityName
            ),
            {
              communityName,
              // TO_DO make this be a date type & make it (null | Date) type
              isMod: true,
            }
          );
        });
      } else {
        throw new Error("Please Log In first");
      }
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <>
      <Modal isOpen={open} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize="15"
            p="3"
          >
            Create a community
          </ModalHeader>
          {/*  */}
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody
              display="flex"
              flexDirection="column"
              p="10px 0px"
              gap="0.5rem"
            >
              {/* Start Community Name */}
              <Box>
                <Text fontWeight={600} fontSize={15}>
                  Name
                </Text>
                <Text fontSize={11} color="gray.500">
                  Community names including capitalization cannot be changed
                </Text>
                <InputGroup size="sm" mt="1rem">
                  <InputLeftElement pointerEvents="none">
                    <Text color="gray.400">r/</Text>
                  </InputLeftElement>
                  <Input
                    type="text"
                    maxLength={21}
                    minLength={3}
                    placeholder="Your Community name"
                    value={communityName}
                    onChange={onNameChange}
                  />
                </InputGroup>
                <Text
                  fontSize="9pt"
                  color={charsRemaining === 0 ? "red" : "gray.500"}
                  pt={2}
                >
                  {charsRemaining} Characters remaining
                </Text>
                <Text color="red" fontSize="9pt" pt={1}>
                  {error}
                </Text>
              </Box>
              {/* End Community Name */}
              {/* Start Communtiy Type */}
              <Box>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                <Stack spacing={2} pt={1}>
                  <Checkbox
                    colorScheme="blue"
                    value="public"
                    isChecked={communityType === "public"}
                    onChange={(e) => setCommunityType(e.target.value)}
                  >
                    <Flex alignItems="center" gap={1}>
                      <Icon as={BsFillPersonFill} color="gray.500" />
                      <Text fontSize="10pt">Public</Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    colorScheme="blue"
                    value="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={(e) => setCommunityType(e.target.value)}
                  >
                    <Flex alignItems="center" gap={1}>
                      <Icon as={BsFillEyeFill} color="gray.500" />
                      <Text fontSize="10pt">Restricted</Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    colorScheme="blue"
                    value="private"
                    isChecked={communityType === "private"}
                    onChange={(e) => setCommunityType(e.target.value)}
                  >
                    <Flex alignItems="center" gap={1}>
                      <Icon as={HiLockClosed} color="gray.500" />
                      <Text fontSize="10pt">Private</Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
              {/* End Community Type */}
            </ModalBody>
          </Box>
          {/*  */}
          {/* Start Footer */}
          <ModalFooter bg="gray.100" borderRadius={"inherit"}>
            <Button
              mr={2}
              h="30px"
              onClick={onClose}
              variant="outline"
              isDisabled={loading}
            >
              Cancel
            </Button>
            <Button
              h="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
          {/* End Footer */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;

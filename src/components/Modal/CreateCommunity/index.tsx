import { PhoneIcon } from "@chakra-ui/icons";
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
  Radio,
  RadioGroup,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillPersonFill, BsFillEyeFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreateCommunityModal = ({ open, onClose }: Props) => {
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityName(e.target.value);
    setCharsRemaining(21 - e.target.value.length);
  };

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

          {/* Start Footer */}
          <ModalFooter bg="gray.100" borderRadius={"inherit"}>
            <Button mr={2} h="30px" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button h="30px" onClick={() => {}}>
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

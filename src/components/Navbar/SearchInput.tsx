import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

type Props = {
  // user: any;
};

const SearchInput = (props: Props) => {
  return (
    <Flex flexGrow={1} mr={2}>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.400" height="100%">
          <SearchIcon />
        </InputLeftElement>
        <Input
          placeholder="Search Reddit"
          fontSize="10pt"
          height="34px"
          bg="gray.50"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500 ",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
        />
        {/* <InputRightElement>
          <CheckIcon color="green.500" />
        </InputRightElement> */}
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;

import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Login from "./Login";
import SignUp from "./SignUp";

type Props = {};

const AuthInputs = (props: Props) => {
  const modalState = useRecoilValue(authModalState);
  return (
    <Flex flexDirection="column" w="100%" mt={4} align="center">
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <SignUp />}
    </Flex>
  );
};

export default AuthInputs;

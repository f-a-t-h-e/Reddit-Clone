import { Button } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type Props = {};

const AuthButtons = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <Button
        variant="outline"
        h="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() =>
          setAuthModalState((prev) => ({ ...prev, open: true, view: "login" }))
        }
      >
        Log In
      </Button>
      <Button
        h="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() =>
          setAuthModalState((prev) => ({
            ...prev,
            open: true,
            view: "signup",
          }))
        }
      >
        Sign Up
      </Button>
    </>
  );
};

export default AuthButtons;

import { Button } from "@chakra-ui/react";
import React from "react";

type Props = {};

const AuthButtons = (props: Props) => {
  return (
    <>
      <Button
        variant="outline"
        h="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        // onClick={()=>{}}
      >
        Log In
      </Button>
      <Button
        h="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
      >
        Sign Up{" "}
      </Button>
    </>
  );
};

export default AuthButtons;

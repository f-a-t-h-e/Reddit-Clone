import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Image } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";

type Props = {};

const OAuthButtons = (props: Props) => {
  const [signInWithGoogle, user, loading, firebaseError] =
    useSignInWithGoogle(auth);

  return (
    <Flex flexDirection="column" w="100%" mb={4}>
      <Button variant="oauth" mb="2" onClick={() => signInWithGoogle()}>
        <Image src="/images/googlelogo.png" alt="google-logo" h="20px" mr="4" />
        Continue with Google
      </Button>
      {firebaseError && (
        <Text color="red" textAlign="center" fontSize="10pt">
          {firebaseError &&
            (FIREBASE_ERRORS[firebaseError.message] ||
              "Something went wrong, please try again later")}
        </Text>
      )}
      <Button variant="oauth">Continue with another Popvider...</Button>
    </Flex>
  );
};

export default OAuthButtons;

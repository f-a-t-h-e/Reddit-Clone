import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Image } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";

type Props = {};

const OAuthButtons = (props: Props) => {
  const [signInWithGoogle, userCred, loading, firebaseError] =
    useSignInWithGoogle(auth);

  // TO_DO remove this after building the backend
  const createUserDoc = async (user: User) => {
    try {
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userCred) {
      createUserDoc(userCred.user);
    }
  }, [userCred]);

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

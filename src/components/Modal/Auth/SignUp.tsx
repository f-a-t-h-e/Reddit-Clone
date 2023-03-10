import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { authModalState } from "../../../atoms/authModalAtom";
import { auth, firestore } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import { User } from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

type Props = {};

const SignUp = (props: Props) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  // TO_DO : use react-form-hook instead
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [
    createUserWithEmailAndPassword,
    userCred,
    firebaseLoading,
    firebaseError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    {
      firebaseLoading !== loading && setLoading(firebaseLoading);
    }
    // TO_DO try improving this
  }, [firebaseLoading, loading]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // FirebaseLogic
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formError) setFormError("");
    // TO_DO add custom email validation as well

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setFormError("Passowrds do not match!");
      return;
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  // TO_DO remove this after building the backend
  const createUserDoc = async (user: User) => {
    setLoading(true);

    try {
      const userDocRef = doc(firestore, "users", user.uid);

      await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    } catch (error: any) {
      console.log(error);
      setFormError(error.message);
    }
  };

  useEffect(() => {
    if (userCred) {
      createUserDoc(userCred.user);
    }
  }, [userCred]);

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb="2"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        onChange={onChange}
      />
      <Input
        // HTML Validaion
        required
        minLength={6}
        name="password"
        placeholder="password"
        type="password"
        mb="2"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        onChange={onChange}
      />
      <Input
        // HTML Validaion
        required
        minLength={6}
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        mb="2"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        onChange={onChange}
      />

      <Text color="red" textAlign="center" fontSize="10pt">
        {formError ||
          (firebaseError &&
            (FIREBASE_ERRORS[firebaseError.message] ||
              "Something went wrong, please try again later"))}
      </Text>

      <Button type="submit" w="100%" h="36px" mt="2" mb="2" isLoading={loading}>
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Already a redditter?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({ ...prev, view: "login" }))
          }
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};

export default SignUp;

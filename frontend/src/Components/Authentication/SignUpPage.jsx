import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <VStack spacing={5}>
          {/* NAME */}
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              onChange={(e) => setName(e.target.value)}
              type={"text"}
              placeholder="Enter your Name"
            />
          </FormControl>

          {/* EMAIL */}
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              type={"email"}
              placeholder="Enter Your Email"
            />
          </FormControl>

          {/* PASSWORD */}
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the Password"
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {/* CONFIRM PASSWORD */}
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {/* PICTURE  */}
          <FormControl id="pic">
            <FormLabel>Upload your Picture</FormLabel>
            <Input
              onChange={(e) => setPic(e.target.files[0])}
              name="pic"
              type="file"
              p={1}
              accept="image/*"
            />
          </FormControl>

          {/* BUTTON */}
          <Button
            type="submit"
            w={"100%"}
            loadingText="Submitting"
            size="md"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Sign up
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default SignUpPage;

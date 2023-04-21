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

const Login = () => {
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
            Log In
          </Button>
          <Button
            // colorScheme="red"
            w={"100%"}
            size="md"
            bg={"red.400"}
            color={"white"}
            _hover={{
              bg: "red.600",
            }}
            onClick={() => {
              setEmail("guest@example.com");
              setPassword("123456");
            }}
          >
            Get Guest User Credentials
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default Login;

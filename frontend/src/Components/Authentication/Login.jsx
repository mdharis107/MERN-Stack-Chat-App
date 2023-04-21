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
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
//   return (
//     <>
//       <form action="" onSubmit={handleSubmit}>
//         <VStack spacing={5}>
//           {/* EMAIL */}
//           <FormControl id="email" isRequired>
//             <FormLabel>Email</FormLabel>
//             <Input
//               onChange={handleChange}
//               type={"email"}
//               placeholder="Enter Your Email"
//             />
//           </FormControl>

//           {/* PASSWORD */}
//           <FormControl id="password" isRequired>
//             <FormLabel>Password</FormLabel>
//             <InputGroup>
//               <Input
//                 onChange={handleChange}
//                 placeholder="Enter the Password"
//                 type={showPassword ? "text" : "password"}
//               />
//               <InputRightElement h={"full"}>
//                 <Button
//                   variant={"ghost"}
//                   onClick={() =>
//                     setShowPassword((showPassword) => !showPassword)
//                   }
//                 >
//                   {showPassword ? <ViewIcon /> : <ViewOffIcon />}
//                 </Button>
//               </InputRightElement>
//             </InputGroup>
//           </FormControl>

//           {/* BUTTON */}
//           <Button
//             type="submit"
//             w={"100%"}
//             loadingText="Submitting"
//             size="md"
//             bg={"blue.400"}
//             color={"white"}
//             _hover={{
//               bg: "blue.500",
//             }}
//           >
//             Sign up
//           </Button>
//         </VStack>
//       </form>
//     </>
//   );
};

export default Login;

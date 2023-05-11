import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { loadData } from "../../utils/localStorage";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import { getSender } from "../Config/Chatlogics";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("http://localhost:8080/chats", config);
      // console.log(data);
      setChats(data);
    } catch (err) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load the data",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    const userInfo = loadData("userInfo");
    setLoggedUser(userInfo);
    fetchChats();
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      w={{ base: "100%", md: "35%" }}
      bg={"whiteAlpha.900"}
      borderRadius={"lg"}
      borderWidth={"1px"}
      p={3}
      color={"black"}
    >
      <Box
        // border={"1px solid red"}
        fontFamily={"Work sans"}
        fontSize={{ base: "30px", md: "20px" }}
        display={"flex"}
        w={"100%"}
        pb={3}
        px={3}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        My Chats
        <Button
          display={"flex"}
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
      </Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        bg={"#F7FAFC"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chats ? (
          <Stack overflowY={"scroll"}>
            {chats.map((ele) => (
              <Box
                onClick={() => setSelectedChat(ele)}
                cursor={"pointer"}
                bg={selectedChat === ele ? "#3182CE" : "blackAlpha.300"}
                color={selectedChat === ele ? "white" : "black"}
                borderRadius={"lg"}
                key={ele._id}
                px={3}
                py={2}
              >
                <Text>
                  {!ele.isGroupChat
                    ? getSender(loggedUser, ele.users)
                    : ele.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;

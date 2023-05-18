import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "./Config/Chatlogics";
import ProfileModal from "./Miscellaneous/Modal/ProfileModal";
import UpdateGroupChatModal from "./Miscellaneous/Modal/UpdateGroupChatModal";
import axios from "axios";
import "./styles/styles.css";
import ScrollChat from "./ScrollChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const toast = useToast();

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:8080/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        setMessages([...messages, data]);
      } catch (err) {
        toast({
          title: "Error Occurred!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/message/${selectedChat._id}`,
        config
      );
      console.log(messages);
      setMessages(data);
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load the Message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            color={"black"}
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            fontFamily={"Work sans"}
            w={"100%"}
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              bg={"blackAlpha.400"}
              color={"black"}
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={3}
            bg={"blackAlpha.300"}
            w={"100%"}
            h={"100%"}
            overflowY={"hidden"}
            borderRadius={"lg"}
          >
            {/* messages Here */}
            {loading ? (
              <Spinner
                size={"xl"}
                w={20}
                h={20}
                alignSelf={"center"}
                margin={"auto"}
              />
            ) : (
              <div className="messages">
                {/* Messages */}
                <ScrollChat messages={messages} />
              </div>
            )}
            <FormControl isRequired mt={3}>
              {/* <FormLabel>Email address</FormLabel> */}
              <Input
                onKeyDown={sendMessage}
                color={"black"}
                type="text"
                variant={"filled"}
                placeholder="Enter a Message..."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text
            color={"black"}
            fontSize={"3xl"}
            pb={3}
            fontFamily={"Work sans"}
          >
            Click on a user to Start Chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;

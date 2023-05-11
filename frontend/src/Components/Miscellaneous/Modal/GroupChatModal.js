import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ChatState } from "../../../Context/ChatProvider";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();
  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleSearch = () => {};
  const handleSubmit = () => {};

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily={"Work sans"}
            display={"flex"}
            justifyContent={"center"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            gap={3}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
          >
            <FormControl>
              <FormLabel>Chat Name</FormLabel>
              <Input
                placeholder="Chat Name"
                type="text"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl>
              <FormLabel>Add Users</FormLabel>
              <Input
                placeholder="Add Users eg: John, Haris"
                type="email"
                onChange={(e) => handleSearch(e.target.value)}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;

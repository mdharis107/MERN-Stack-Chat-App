import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user } = ChatState();

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"whiteAlpha.900"}
        w={"100%"}
        p={"5px 10px"}
        borderWidth={"5px"}
      >
        <Tooltip
          label="Search Users to Chat"
          hasArrow
          placement="bottom-end"
          aria-label="A tooltip"
        >
          <Button w={"auto"} leftIcon={<Search2Icon />} variant={"ghost"}>
            <Text
              ml={-5}
              fontSize={"15px"}
              fontWeight={"500"}
              display={{ base: "none", md: "flex" }}
              px="4"
            >
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text>MERN-CHAT</Text>
        <Box flexDirection={"row"} gap={5}>
          <Menu>
            <MenuButton p={1}>
              <BellIcon boxSize={5} m={1} />
            </MenuButton>
            <MenuList></MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default SideDrawer;
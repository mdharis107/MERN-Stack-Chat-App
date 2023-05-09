import { BellIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

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
          <Button leftIcon={<Search2Icon />} variant={"ghost"}>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Heading>MERN-CHAT</Heading>
        <Menu>
          <MenuButton p={1}>
            <BellIcon boxSize={5} m={1} />
          </MenuButton>
          <MenuList></MenuList>
        </Menu>
      </Box>
    </>
  );
};

export default SideDrawer;

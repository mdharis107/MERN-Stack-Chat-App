const { Router } = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChats,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chats.controller");

const ChatsRouter = Router();

ChatsRouter.post("/", accessChat);

ChatsRouter.get("/", fetchChats);

ChatsRouter.post("/group", createGroupChats);

ChatsRouter.put("/rename", renameGroup);

ChatsRouter.put("/groupremove", removeFromGroup);

ChatsRouter.put("/groupadd", addToGroup);

module.exports = { ChatsRouter };

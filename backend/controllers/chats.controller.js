const { ChatModel } = require("../models/chat.model");
const { UserModel } = require("../models/user.model");

const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    // console.log("UerId params not sent with request")
    res.status(400).send("UerId params not sent with request");
  }

  var isChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await ChatModel.create(chatData);
      const FullChat = await ChatModel.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");

      res.status(200).send(FullChat);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error fetching the Chat");
    }
  }
};

const fetchChats = () => {};

const createGroupChats = () => {};

const renameGroup = () => {};

const removeFromGroup = () => {};

const addToGroup = () => {};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChats,
  removeFromGroup,
  renameGroup,
  addToGroup,
};

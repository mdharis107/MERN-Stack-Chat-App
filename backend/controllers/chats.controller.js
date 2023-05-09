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

const fetchChats = async (req, res) => {
  try {
    ChatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await UserModel.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (err) {
    res.status(400).send(err);
  }
};

const createGroupChats = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    res.status(400).send({ message: "Please fill all the Fields" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    res
      .status(401)
      .send({ message: "Minimum of two Users are required to form a Group" });
  }

  users.push(req.users);

  try {
    const groupChat = await ChatModel.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await ChatModel.findOne({
      _id: groupChat._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullGroupChat);
  } catch (err) {
    res.status(400).send(err);
  }
};

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

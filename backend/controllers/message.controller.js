const { ChatModel } = require("../models/chat.model");
const { MessageModel } = require("../models/message.model");
const { UserModel } = require("../models/user.model");

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    res.status(400).send("Invalid Data");
  }

  // var newMessage = {
  //   sender: req.user._id,
  //   content: content,
  //   chat: chatId,
  // };

  const newMessage = new MessageModel({
    sender: req.user._id,
    content: content,
    chat: chatId,
  });

  try {
    const message = await newMessage.save();
    await message.populate("sender", "name pic");
    await message.populate("chat");

    // var message = await MessageModel.create(newMessage);

    // await message
    //   .populate({ path: "sender", select: "name pic" })
    //   .populate("chat");

    // await message.populate({ path: "chat", select: "isGroupChat chatName" });

    // const data = await message.aggregate([
    //   {
    //     $lookup: {
    //       from: message,
    //       localField: "_id",
    //       foreignField: "_id",
    //       as: "chat",
    //     },
    //   },
    // ]);

    // console.log(data);

    // console.log(message);

     await UserModel.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    // console.log(message, "here");

    await ChatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.send(message);
  } catch (err) {
    res.status(400).send(err);
  }
};

const allMessages = async (req, res) => {
  // const {} = req.body;

  try {
    const messages = await MessageModel.find({
      chat: req.params.chatId,
    }).populate("sender", "name pic email");
    // .populate("users");

    res.send(messages);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { sendMessage, allMessages };

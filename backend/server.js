const express = require("express");
const { chats } = require("./data/data");
const cors = require("cors");
const { connection } = require("./config/db");
const colors = require("colors");
const { UserRouter } = require("./routes/user.routes");
const { authentication } = require("./middlewares/authentication");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const { ChatsRouter } = require("./routes/chats.routes");
const { messageRouter } = require("./routes/message.routes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("This is the Home page");
});

app.use("/user", UserRouter);

app.use(authentication);

app.use("/chats", ChatsRouter);

app.use("/message", messageRouter);

app.use(notFound);

app.use(errorHandler);

const server = app.listen(PORT, async () => {
  try {
    await connection;
    console.log(
      `MongoDB Connected: ${(await connection).connection.host}`.cyan.underline
    );
  } catch (err) {
    console.log(err);
    console.log(`Error: ${err.message}`.red.bold);
  }
  console.log(`Server is listening on PORT ${PORT}`.cyan.bold);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
});

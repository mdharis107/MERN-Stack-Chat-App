const express = require("express");
const { chats } = require("./data/data");
const cors = require("cors");
const { connection } = require("./config/db");
const colors = require("colors");
const { UserRouter } = require("./routes/user.routes");
const { authentication } = require("./middlewares/authentication");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("This is the Home page");
});

app.use("/user", UserRouter);

// app.use(authentication);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, async () => {
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

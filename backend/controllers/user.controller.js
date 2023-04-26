const { generateToken } = require("../config/GenerateToken");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");

const RegisterUser = async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Credentials");
  }

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  } else {
    bcrypt.hash(password, 6, async function (err, hash) {
      if (err) {
        res.status(400);
        throw new Error("Something went wrong");
      }
      const user = new UserModel({
        name,
        email,
        password: hash,
        pic,
      });

      if (user) {
        await user.save();
        res.status(201).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Failed to create the User");
      }
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user) {
    const hash = user.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send("check your password");
        // throw new Error("Something went wrong");
      }

      if (result) {
        res.status(201).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        });
      }
    });
  } else {
    res.status(400);
    throw new Error("User doesn't Exist");
  }
};

module.exports = {
  RegisterUser,
  loginUser,
};

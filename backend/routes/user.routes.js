const { Router } = require("express");
const { RegisterUser, loginUser } = require("../controllers/user.controller");

const UserRouter = Router();

UserRouter.post("/signup", RegisterUser);
UserRouter.post("/login",loginUser);

module.exports = {
  UserRouter,
};

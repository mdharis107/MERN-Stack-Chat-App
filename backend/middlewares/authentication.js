const jwt = require("jsonwebtoken");
const { verifyToken } = require("../config/GenerateToken");
require("dotenv").config();

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ msg: "Please login" });
  }

  const token = req.headers.authorization;

  verifyToken(token, function (err, decoded) {
    if (err) {
      console.log(err);
      res.status(400);
      throw new Error("Enter the correct Credentials");
    } else {
      console.log(decoded);
      next();
    }
  });
  //   jwt.verify(token, process.env.PRIVATE_key, function (err, decoded) {
  //     if (err) {
  //       res.send({ msg: "Something went wrong, Please try again" });
  //     } else {
  //       req.body.userId = decoded.userId;
  //       next();
  //     }
  //   });
};

module.exports = { authentication };

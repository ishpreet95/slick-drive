const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.user;

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(401).send({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await User.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!foundUser) {
      res.status(404).send({
        message: "User not found",
      });
    }
    req.user = foundUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = isLoggedIn;

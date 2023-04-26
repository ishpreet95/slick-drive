const db = require("../../../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!foundUser) {
      console.log(err);
      return res.status(404).send({
        message: "User not found",
      });
    }

    const passwordIsValid = bcrypt.compareSync(password, foundUser.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password",
      });
    }

    foundUser.password = undefined;
    const token = jwt.sign(
      {
        id: foundUser.id,
        email: foundUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400,
      }
    );
    // res.setHeader("Set-Cookie", "test=value");
    // res.cookie("token", "hehe");
    return res.status(200).send({
      status: "success",
      user: foundUser,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = loginUser;

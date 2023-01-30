const db = require("../../../models");
const User = db.user;

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({
        message: "Please fill in all fields",
      });
    }
    User.create({
      username,
      email,
      password,
    })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: err.errors,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = registerUser;

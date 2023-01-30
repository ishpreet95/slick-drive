const db = require("../../../models");
const User = db.user;

const getUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      console.log(err);
      return res.status(404).send({
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = getUser;

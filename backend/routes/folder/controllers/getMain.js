const db = require("../../../models");
const Folder = db.folder;

const getMain = async (req, res) => {
  try {
    const user = req.user;
    const folders = await Folder.findAll({
      where: {
        owner: user.id,
        parentFolder: null,
      },
    });
    const files = [];
    return res.status(200).json({
      status: "success",
      folders,
      files,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = getMain;

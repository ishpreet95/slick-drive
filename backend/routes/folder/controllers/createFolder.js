const db = require("../../../models");
const Folder = db.folder;

const createFolder = async (req, res) => {
  try {
    const { name, parentFolder } = req.body;
    if (!name) {
      return res.status(400).send({
        message: "Folder name is required",
      });
    }
    const user = req.user;
    owner = user.id;
    if (parentFolder) {
      const parent = await Folder.findOne({
        where: {
          id: parentFolder,
          owner,
        },
      });
      if (!parent) {
        return res.status(404).send({
          message: "Parent folder not found",
        });
      }
    }
    const folder = await Folder.create({
      name,
      parentFolder,
      owner,
    });
    return res.status(200).json({
      status: "success",
      folder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = createFolder;

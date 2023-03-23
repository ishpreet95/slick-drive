const db = require("../../../models");
const Folder = db.folder;
const File = db.file;

const getFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const folder = await Folder.findOne({
      where: {
        id,
        owner: req.user.id,
      },
    });
    if (!folder) {
      return res.status(404).send({
        message: "Folder not found",
      });
    }
    const files = await File.findAll({
      where: {
        parentFolder: id,
      },
    });
    const subFolders = await Folder.findAll({
      where: {
        parentFolder: id,
      },
    });
    return res.status(200).json({
      status: "success",
      folder,
      files,
      subFolders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = getFolder;

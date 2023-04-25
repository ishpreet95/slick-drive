const db = require("../../../models");
const Folder = db.folder;
const File = db.file;

const deleteFolder = async (req, res) => {
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
    const subFolders = await Folder.findAll({
      where: {
        parentFolder: id,
      },
    });
    if (subFolders.length > 0) {
      return res.status(400).send({
        message: "Folder is not empty",
      });
    }
    const files = await File.findAll({
      where: {
        parentFolder: id,
      },
    });
    if (files.length > 0) {
      return res.status(400).send({
        message: "Folder is not empty",
      });
    }
    const parentFolder = folder.parentFolder;
    await Folder.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({
      status: "success",
      folder,
      parentFolder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = deleteFolder;

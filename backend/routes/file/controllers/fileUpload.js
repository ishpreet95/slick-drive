const db = require("../../../models");
const File = db.file;
const Folder = db.folder;

const fileUpload = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send({
        message: "No files were uploaded",
      });
    }
    const { parentFolder } = req.body;
    if (!parentFolder) {
      return res.status(400).send({
        message: "Parent folder is required",
      });
    }
    const foundFolder = await Folder.findOne({
      where: {
        id: parentFolder,
        owner: req.user.id,
      },
    });
    if (!foundFolder) {
      return res.status(404).send({
        message: "Folder not found",
      });
    }

    const file = req.files[0];
    const newFile = await File.create({
      name: file.filename,
      path: "./uploads/" + file.filename,
      parentFolder: req.body.parentFolder,
      type: file.mimetype,
      size: file.size,
      owner: req.user.id,
    });
    return res.status(200).json({
      status: "success",
      file: newFile,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = fileUpload;

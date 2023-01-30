const db = require("../../../models");
const File = db.file;

const fileUpload = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send({
        message: "No files were uploaded",
      });
    }
    const file = req.files[0];
    const newFile = await File.create({
      name: file.filename,
      path: "./uploads/" + file.filename,
      parentFolder: req.body.parentFolder,
      type: file.mimetype,
      size: file.size,
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

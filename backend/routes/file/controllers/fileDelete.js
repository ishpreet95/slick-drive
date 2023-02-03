const db = require("../../../models");
const File = db.file;
const fs = require("fs");

const fileDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findOne({
      where: {
        id,
        owner: req.user.id,
      },
    });
    if (!file) {
      return res.status(404).send({
        message: "File not found",
      });
    }
    await File.destroy({
      where: {
        id,
      },
    });
    fs.unlink(file.path, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: err.message,
        });
      }
    });
    return res.status(200).json({
      status: "success",
      file,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = fileDelete;

const db = require("../../../models");
const File = db.file;

const sendFile = async (req, res) => {
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

    res.sendFile(file.path.slice(1), { root: "." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = sendFile;

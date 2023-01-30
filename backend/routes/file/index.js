const router = require("express").Router();
const { fileUpload, fileDelete } = require("./controllers");
const { isLoggedIn, upload } = require("../../middlewares");

router.post("/upload", upload, fileUpload);
router.post("/delete/:id", fileDelete);
module.exports = router;

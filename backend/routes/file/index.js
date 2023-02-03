const router = require("express").Router();
const { fileUpload, fileDelete } = require("./controllers");
const { isLoggedIn, upload } = require("../../middlewares");

router.post("/upload", isLoggedIn, upload, fileUpload);
router.post("/delete/:id", isLoggedIn, fileDelete);
module.exports = router;

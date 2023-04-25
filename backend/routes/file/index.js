const router = require("express").Router();
const { fileUpload, fileDelete, sendFile } = require("./controllers");
const { isLoggedIn, upload } = require("../../middlewares");

router.post("/upload", isLoggedIn, upload, fileUpload);
router.post("/delete/:id", isLoggedIn, fileDelete);
router.get("/download/:id", isLoggedIn, sendFile);
module.exports = router;

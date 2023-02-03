const router = require("express").Router();

const { isLoggedIn } = require("../../middlewares");
const { createFolder, deleteFolder, getFolder } = require("./controllers");

router.post("/create", isLoggedIn, createFolder);
router.post("/delete/:id", isLoggedIn, deleteFolder);
router.get("/get/:id", isLoggedIn, getFolder);

module.exports = router;

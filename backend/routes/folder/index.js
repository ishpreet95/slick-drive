const router = require("express").Router();

const { isLoggedIn } = require("../../middlewares");
const { createFolder, deleteFolder, getFolder, getMain } = require("./controllers");

router.post("/create", isLoggedIn, createFolder);
router.post("/delete/:id", isLoggedIn, deleteFolder);
router.get("/get/:id", isLoggedIn, getFolder);
router.get("/get", isLoggedIn, getMain);

module.exports = router;

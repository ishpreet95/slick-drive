const router = require("express").Router();
const { registerUser, loginUser, getUser } = require("./controllers");
const { isLoggedIn } = require("../../middlewares");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", isLoggedIn, getUser);

module.exports = router;

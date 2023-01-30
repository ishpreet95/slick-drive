const userRouter = require("./user");
const fileRouter = require("./file");
const router = require("express").Router();

router.use("/user", userRouter);
router.use("/file", fileRouter);
module.exports = router;

const userRouter = require("./user");
const fileRouter = require("./file");
const folderRouter = require("./folder");
const router = require("express").Router();

router.use("/user", userRouter);
router.use("/file", fileRouter);
router.use("/folder", folderRouter);

module.exports = router;

const express = require("express");
const bookRouter = require("./bookRoutes");
const authRouter = require("./authRoutes");
const router = express.Router();

router.use("/auth", authRouter);

router.use("/book", bookRouter);

module.exports = router;

const express = require("express");
const usersRouter = require("./user");
const authRouter = require("./auth");

const router = new express.Router();

router.use("/users", usersRouter);

router.use("/auth", authRouter);

module.exports = router;

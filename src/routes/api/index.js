const express = require("express");
const usersRouter = require("./user");
const authRouter = require("./auth");
const accountRouter = require("./account");

const router = new express.Router();

router.use("/users", usersRouter);

router.use("/auth", authRouter);

router.use("/account", accountRouter);

module.exports = router;

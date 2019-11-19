const express = require("express");
const usersRouter = require("./user");
const authRouter = require("./auth");
const accountRouter = require("./account");

const router = new express.Router();

router.use("/users", usersRouter);

router.use("/auth", authRouter);

router.use("/account", accountRouter);

router.use("/status", (req, res) => {
	res.send({ status: "success", code: 200, message: "OK" });
});

module.exports = router;

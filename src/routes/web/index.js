const express = require("express");
const oauthRouter = require("./oauth");

const router = new express.Router();

router.use("/oauth", oauthRouter);

module.exports = router;

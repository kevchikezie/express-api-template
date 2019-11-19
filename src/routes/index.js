const express = require("express");
const index = require("./api");
const web = require("./web");

const router = new express.Router();

router.use("/api/v1/", index);

router.use("/", web);

// router.use('/api/docs', 'you can use swagger here'); //TODO: Add swagger

module.exports = router;

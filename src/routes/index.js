const express = require("express");
const index = require("./api");

const router = new express.Router();

router.use("/api/v1/", index);

// router.use('/api/docs', 'you can use swagger here'); //DO NOT DELETE

module.exports = router;

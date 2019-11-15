const express = require("express");
const VerifyEmailController = require("../../controllers/auth/verifyEmailController");

const router = new express.Router();

router.get("/email/verify", VerifyEmailController.verify);

module.exports = router;

const express = require("express");
const VerifyEmailController = require("../../controllers/auth/verifyEmailController");
const ForgotPasswordController = require("../../controllers/auth/forgotPasswordController");

const router = new express.Router();

router.get("/email/verify", VerifyEmailController.verify);

router.post("/password/reset", ForgotPasswordController.reset);

module.exports = router;

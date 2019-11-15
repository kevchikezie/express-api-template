const express = require("express");
const apiAuth = require("../../middlewares/apiAuth");
const LoginController = require("../../controllers/auth/loginController");
const RegisterController = require("../../controllers/auth/registerController");
const VerifyEmailController = require("../../controllers/auth/verifyEmailController");

const router = new express.Router();

router.post("/login", LoginController.login);

router.post("/register", RegisterController.register);

router.post("/email/resend", apiAuth, VerifyEmailController.resend);

router.post("/email/status", apiAuth, VerifyEmailController.status);

router.post("/logout", apiAuth, LoginController.logout);

module.exports = router;

const express = require("express");
const AuthController = require("../../controllers/authController");
const apiAuth = require("../../middlewares/apiAuth");

const router = new express.Router();

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

router.post("/logout", apiAuth, AuthController.logout);

module.exports = router;

const express = require("express");
const UserController = require("../../controllers/userController");
const apiAuth = require("../../middlewares/apiAuth");

const router = new express.Router();

router.post("/", UserController.create);

router.route("/").get(apiAuth, UserController.index);

router.get("/:id", UserController.show);

router.patch("/:id", UserController.update);

router.delete("/:id", UserController.destroy);

module.exports = router;

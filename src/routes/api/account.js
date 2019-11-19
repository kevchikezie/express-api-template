const express = require("express");
const multer = require("multer");
const apiAuth = require("../../middlewares/apiAuth");
const AccountController = require("../../controllers/accountController");

const router = new express.Router();

const upload = multer({
	limits: {
		fileSize: 1000000 //1MB
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(png|jpg|jpeg|svg|gif)$/)) {
			return cb(new Error("Please upload an image file"));
		}

		cb(undefined, true);
	}
});

router.get("/profile", apiAuth, AccountController.profile);
router.patch("/profile", apiAuth, AccountController.updateProfile);
router.patch("/change-password", apiAuth, AccountController.changePassword);

router.patch(
	"/profile/image",
	apiAuth,
	upload.single("image"),
	AccountController.updateImage,
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);
router.delete("/profile/image", apiAuth, AccountController.deleteImage);
router.get("/profile/image", apiAuth, AccountController.getImage);

module.exports = router;

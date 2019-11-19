const validator = require("validator");
const models = require("../database/models");
const Password = require("../utils/passwordHasher");
const AccountService = require("../services/accountService");

class AccountController {
	/**
	 * Display the profile of the logged in user
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {void}
	 */
	async profile(req, res) {
		try {
			const user = AccountService.publicData(req.user.dataValues);

			res.send({ status: "success", code: 200, message: "OK", data: user });
		} catch (error) {
			res.status(500).send();
		}
	}

	/**
	 * Update profile of the logged in user
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {void}
	 */
	async updateProfile(req, res) {
		try {
			const user = await models.User.findOne({ where: { id: req.user.id } });

			if (!user) {
				res
					.status(404)
					.send({ error: { code: 404, message: "Profile not found" } });
			}

			const updatedUser = await user.update(req.body, {
				where: { id: req.user.id }
			});

			const publicData = AccountService.publicData(updatedUser.dataValues);

			res.send({
				status: "success",
				code: 200,
				message: "Update was successful.",
				data: publicData
			});
		} catch (error) {
			res
				.status(400)
				.send({ error: { code: 400, message: error.errors[0].message } });
		}
	}

	/**
	 * Change password feature
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {void}
	 */
	async changePassword(req, res) {
		try {
			if (validator.isEmpty(req.body.password)) {
				res
					.status(400)
					.send({ error: { code: 400, message: "Password is required." } });
			}

			if (!validator.isLength(req.body.password, { min: 8 })) {
				res.status(422).send({
					error: {
						code: 422,
						message: "Password must be at least 8 characters."
					}
				});
			}

			if (!validator.equals(req.body.password, req.body.confirm_password)) {
				res.status(422).send({
					error: {
						code: 422,
						message: "Password must be same as confirm password."
					}
				});
			}

			if (!(await Password.match(req.body.old_password, req.user.password))) {
				res
					.status(409)
					.send({ error: { code: 409, message: "Old password is wrong." } });
			} else {
				const hashedPassword = await Password.hash(req.body.password);

				req.user.password = hashedPassword;
				await req.user.save();

				// Destroy all token associated with this account
				await req.user.userTokens[0].destroy();
			}

			res.status(204).send();
		} catch (error) {
			res.status(500).send();
		}
	}

	/**
	 * Update user's profile image
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {void}
	 */
	async updateImage(req, res) {
		req.user.image = req.file.buffer;
		await req.user.save();
		res.send({ status: "success", code: 200, message: "Image uploaded" });
	}

	/**
	 * Delete user's profile image
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {void}
	 */
	async deleteImage(req, res) {
		req.user.image = null;
		await req.user.save();
		res.status(204).send();
	}

	/**
	 * Get the profile image for a user
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {void}
	 */
	async getImage(req, res) {
		try {
			if (!req.user || !req.user.image) {
				throw new Error();
			}

			res.set("Content-Type", "image/jpg");
			res.send(req.user.image);
		} catch (error) {
			res
				.status(404)
				.send({ error: { code: 404, message: "Image not found" } });
		}
	}
}

module.exports = new AccountController();

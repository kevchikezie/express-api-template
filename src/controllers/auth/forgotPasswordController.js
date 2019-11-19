const validator = require("validator");
const ForgotPasswordService = require("../../services/auth/forgotPasswordService");

class ForgotPasswordController {
	/**
	 * Send password reset link to user's email
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {void}
	 */
	async sendResetLink(req, res) {
		try {
			ForgotPasswordService.sendResetLinkEmail(req.body.email);

			res.send({
				status: "success",
				code: 200,
				message: "Reset link sent to your email. Check your inbox or spam."
			});
		} catch (error) {
			res.status(500).send();
		}
	}

	/**
	 * Display reset password form
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {void}
	 */
	async reset(req, res) {
		try {
			if (validator.isEmpty(req.body.password)) {
				res
					.status(400)
					.send({ error: { code: 400, message: "Password is required" } });
			}

			if (!validator.isLength(req.body.password, { min: 8 })) {
				res.status(400).send({
					error: {
						code: 400,
						message: "Password must be at least 8 characters"
					}
				});
			}

			if (!validator.equals(req.body.password, req.body.confirm_password)) {
				res.status(400).send({
					error: {
						code: 400,
						message: "Password must be same as confirm password"
					}
				});
			}

			const hasReset = await ForgotPasswordService.resetPassword(
				req.query.token,
				req.body.password
			);

			if (hasReset) {
				res.send({ message: "Password reset was successful." });
			}
		} catch (error) {
			res.status(400).send({
				error: {
					code: 400,
					message:
						"Token is invalid or has expired. Try sending reset link again."
				}
			});
		}
	}
}

module.exports = new ForgotPasswordController();

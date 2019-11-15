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
				title: "OK",
				message: "Reset link sent to your email. Check your inbox or spam."
			});
		} catch (error) {
			res.status(500).send();
		}
	}
}

module.exports = new ForgotPasswordController();

const Mail = require("../../utils/mail");
const models = require("../../database/models");
const Token = require("../../utils/tokenManager");

class ForgotPasswordService {
	/**
	 * Handles the sending of password reset link to user's email
	 * @param {string} email the registered user's email
	 * @returns {void}
	 */
	async sendResetLinkEmail(email) {
		const user = await models.User.findOne({ where: { email: email } });

		if (user) {
			const resetPasswordUrl = await this.resetPasswordUrl(user.email);

			const subject = "Reset Password Notification";

			const body = `<p><strong>Hello ${user.name}, </strong></p>
			<p>You are receiving this email because we received a password reset request for your account.</p>
			<p>This password reset link will expire in 60 minutes</p>
			<p> <a href=${resetPasswordUrl}>${resetPasswordUrl}</a> </p>
			<p>If you did not request a password reset, no further action is required.</p> <br><br>
			<p>Regards, <br> ${process.env.APP_NAME}</p>`;

			Mail.send(email, subject, body);
			// console.log(resetPasswordUrl);
		} else {
			return false;
		}
	}

	/**
	 * Creates the password reset url
	 * @param {string} email the registered user's email
	 * @returns {string}
	 */
	async resetPasswordUrl(email) {
		const token = await Token.generate({ email }, "60 minutes");

		return `${process.env.APP_URL}/oauth/password/reset?token=${token}`;
	}

	/**
	 * Verify token and mark email as verified on database
	 * @param {string} token
	 * @returns {boolean}
	 */
	async markEmailAsVerified(token) {
		const decoded = await Token.decode(token);

		const user = await models.User.findOne({ where: { email: decoded.email } });

		if (!user) {
			throw new Error("Unable to verify user");
		}

		if (user.verifiedAt) {
			return false;
		}

		const newUser = await user.update(
			{ verifiedAt: new Date() },
			{ where: { id: user.id } }
		);

		if (!newUser) {
			throw new Error("Unable to verify user");
		}

		return true;
	}
}

module.exports = new ForgotPasswordService();

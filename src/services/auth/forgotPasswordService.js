const Mail = require("../../utils/mail");
const models = require("../../database/models");
const Token = require("../../utils/tokenManager");
const Password = require("../../utils/passwordHasher");

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
	 * Resets user's password inthe database
	 * @param {string} token
	 * @param {string} password
	 * @returns {boolean}
	 */
	async resetPassword(token, password) {
		const decoded = await Token.decode(token);

		const user = await models.User.findOne({ where: { email: decoded.email } });

		if (!user) {
			throw new Error("Unable to verify user");
		}

		const hashedPassword = await Password.hash(password);

		// Destroy all tokens relating to user
		await models.UserToken.destroy({ where: { userId: user.id } });

		const passwordUpdated = await user.update(
			{ password: hashedPassword },
			{ where: { id: user.id } }
		);

		if (!passwordUpdated) {
			throw new Error("Unable to verify user");
		}

		return true;
	}
}

module.exports = new ForgotPasswordService();

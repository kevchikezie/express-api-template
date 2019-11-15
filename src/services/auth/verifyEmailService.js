const Mail = require("../../utils/mail");
const models = require("../../database/models");
const Token = require("../../utils/tokenManager");

class VerifyEmailService {
	/**
	 * Handles the sending of email verification mails to users after registration.
	 * @param {string} email the registered user's email
	 * @returns {void}
	 */
	async sendEmailVerification(email) {
		const verificationUrl = await this.verificationUrl(email);

		const subject = "Email Verification";

		const body = `<p><strong>Hello, </strong></p>
			<p>Please click the link below to verify your email address.</p>
			<p> <a href=${verificationUrl}>${verificationUrl}</a> </p>
			<p>If you did not create an account, no further action is required.</p>`;

		Mail.send(email, subject, body);
	}

	/**
	 * Creates the verification url
	 * @param {string} email the registered user's email
	 * @returns {string}
	 */
	async verificationUrl(email) {
		const token = await Token.generate({ email }, "60 minutes");

		return `${process.env.APP_URL}/oauth/email/verify?token=${token}`;
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

module.exports = new VerifyEmailService();

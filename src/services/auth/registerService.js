const models = require("../../database/models");
const Token = require("../../utils/tokenManager");
const Password = require("../../utils/passwordHasher");
const VerifyEmailService = require("./verifyEmailService");

class RegisterService {
	constructor() {
		this.mustVerifyEmail = process.env.MUST_VERIFY_EMAIL || "false";
	}
	/**
	 * Handles user registration request for the application.
	 * @param {Object} data
	 * @returns {Object}
	 */
	async registerUser(data) {
		const hashedPassword = await Password.hash(data.password);

		const user = await models.User.create({
			name: data.name,
			email: data.email,
			password: hashedPassword
		});

		if (!user) {
			throw new Error("Unable to register");
		}

		const token = await Token.generate(user);
		await models.UserToken.create({ userId: user.id, token });

		if (this.mustVerifyEmail === "true") {
			VerifyEmailService.sendEmailVerification(user.email);
		}

		return { user, token };
	}
}

module.exports = new RegisterService();

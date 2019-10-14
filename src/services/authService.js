const validator = require("validator");
const Password = require("../utils/passwordHasher");
const Token = require("../utils/tokenManager");
const models = require("../database/models");

class AuthService {
	/**
	 * Attempt to log the user into the application.
	 * @param {string} email email can also be username
	 * @param {string} password
	 * @returns {object}
	 */
	async attemptLogin(email, password) {
		const user = await this.findByCredential(email);
		if (!user) {
			throw new Error("Unable to login");
		}

		const isMatch = await Password.match(password, user.password);
		if (!isMatch) {
			throw new Error("Unable to login");
		}

		const token = await Token.generate(user);
		await this.saveToken(user, token);

		return { user, token };
	}

	/**
	 * Handle a registration request for the application.
	 * @param {object} data
	 * @returns {object}
	 */
	async registerUser(data) {
		const willSendVerificationEmail = false;

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
		await this.saveToken(user, token);

		if (willSendVerificationEmail) {
			// TODO: Send verification email
			// This email service should be a util function or a microservice
		}

		return { user, token };
	}

	/**
	 * Find a user by credential (either email or username)
	 * @param {string} credential
	 * @returns {object}
	 */
	findByCredential(credential) {
		return validator.isEmail(credential)
			? this.findByEmail(credential)
			: this.findByUsername(credential);
	}

	/**
	 * Find a user by email
	 * @param {string} email
	 * @returns {object}
	 */
	async findByEmail(email) {
		return await models.User.findOne({ where: { email } });
	}

	/**
	 * Find a user by username
	 * @param {string} username
	 * @returns {object}
	 */
	async findByUsername(username) {
		return await models.User.findOne({ where: { username } });
	}

	/**
	 * Save generated token
	 * @param {object} user
	 * @param {string} token
	 * @returns {object}
	 */
	async saveToken(user, token) {
		return await models.UserToken.create({ userId: user.id, token });
	}

	// TODO: Function to send verification email
	// TODO: Function to verify use. This is to change the verifyAt field to the verification date
}

module.exports = new AuthService();

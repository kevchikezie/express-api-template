const validator = require("validator");
const Password = require("../../utils/passwordHasher");
const Token = require("../../utils/tokenManager");
const models = require("../../database/models");

class LoginService {
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
		await models.UserToken.create({ userId: user.id, token });

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
}

module.exports = new LoginService();

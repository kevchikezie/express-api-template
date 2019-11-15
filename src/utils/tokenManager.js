const jwt = require("jsonwebtoken");

class TokenManager {
	/**
	 * Generates token
	 * @param {Object} data that will be embedded into the token payload
	 * @param {string} period how long you want the token to be valid (token lifetime)
	 * @returns {string} generated token
	 */
	async generate(data, period = "") {
		const token = jwt.sign(
			{
				id: data.id,
				email: data.email,
				name: data.name
			},
			process.env.TOKEN_SECRET_KEY,
			{
				expiresIn: period || process.env.TOKEN_LIFETIME
			}
		);

		return token;
	}

	/**
	 * Verify if a token is still valid or expired
	 * @param {string} token the toen you wish to verify
	 * @returns {boolean}
	 */
	decode(token) {
		return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
	}
}

module.exports = new TokenManager();

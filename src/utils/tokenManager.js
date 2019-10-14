const jwt = require("jsonwebtoken");

class TokenManager {
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

	decode(token) {
		return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
	}
}

module.exports = new TokenManager();

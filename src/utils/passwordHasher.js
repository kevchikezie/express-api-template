const bcrypt = require("bcrypt");

class PasswordHasher {
	/**
	 * Hash password
	 * @param {string} password
	 * @returns {string} hashedPassword
	 */
	async hash(password) {
		return await bcrypt.hash(password, 8);
	}

	/**
	 * Compare a password and a hashed password to get a match
	 * @param {string} password
	 * @param {string} hashedPassword
	 * @returns {boolean}
	 */
	async match(password, hashedPassword) {
		return await bcrypt.compare(password, hashedPassword);
	}

	/**
	 * Generate a random password
	 * @returns {string} plainPassword
	 */
	random() {
		const special = "!@#$%^&*()_+=<>";
		const rnum = Math.floor(Math.random() * special.length);

		const alphaNumeric =
			Math.random()
				.toString(36)
				.substring(2, 8) +
			Math.random()
				.toString(36)
				.substring(2, 8)
				.toUpperCase();

		const password = alphaNumeric.replace(alphaNumeric[rnum], special[rnum]);

		return password;
	}
}

module.exports = new PasswordHasher();

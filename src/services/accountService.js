const models = require("../database/models");

class AccountService {
	/**
	 * Returns ONLY data that should be made available to the public
	 * @param {Object} data
	 * @returns {Object}
	 */
	publicData(data) {
		delete data.password;
		delete data.image;
		delete data.userTokens;

		return data;
	}
}

module.exports = new AccountService();

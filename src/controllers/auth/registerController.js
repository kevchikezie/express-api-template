const RegisterService = require("../../services/auth/registerService");

class RegisterController {
	/**
	 * Register a user to the application
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {void}
	 */
	async register(req, res) {
		try {
			const user = await RegisterService.registerUser(req.body);

			res.status(201).send(user);
		} catch (error) {
			res.status(400).send(error);
		}
	}
}

module.exports = new RegisterController();

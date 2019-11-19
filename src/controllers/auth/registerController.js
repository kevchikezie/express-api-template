const validator = require("validator");
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
			if (validator.isEmpty(req.body.password)) {
				res
					.status(400)
					.send({ error: { code: 400, message: "Password is required" } });
			} else {
				const user = await RegisterService.registerUser(req.body);

				delete user.user.dataValues.password;
				delete user.user.dataValues.image;

				res
					.status(201)
					.send({ status: "success", code: 200, message: "OK", data: user });
			}
		} catch (error) {
			res
				.status(400)
				.send({ error: { code: 400, message: error.errors[0].message } });
		}
	}
}

module.exports = new RegisterController();

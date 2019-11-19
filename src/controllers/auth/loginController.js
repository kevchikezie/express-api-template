const LoginService = require("../../services/auth/loginService");

class LoginController {
	/**
	 * Log a user in to the application
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {void}
	 */
	async login(req, res) {
		try {
			const user = await LoginService.attemptLogin(
				req.body.email,
				req.body.password
			);

			res.send(user);
		} catch (error) {
			res
				.status(400)
				.send({ error: { code: 400, message: "Wrong login credentials" } });
		}
	}

	/**
	 * Log out a user from the application
	 * @param {Object} req
	 * @param {Object} res
	 * @returns {void}
	 */
	async logout(req, res) {
		try {
			if (req.user.userTokens[0].token !== req.token) {
				throw new Error("Unauthenticated");
			}

			await req.user.userTokens[0].destroy();

			res.send();
		} catch (error) {
			res.status(500).send();
		}
	}
}

module.exports = new LoginController();

const AuthService = require("../services/authService");

class AuthController {
	async login(req, res) {
		try {
			const user = await AuthService.attemptLogin(
				req.body.email,
				req.body.password
			);

			res.send(user);
		} catch (error) {
			res.status(400).send({ error: "Wrong login credentials" });
		}
	}

	async register(req, res) {
		try {
			const user = await AuthService.registerUser(req.body);

			res.status(201).send(user);
		} catch (error) {
			res.status(400).send(error);
		}
	}

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

module.exports = new AuthController();

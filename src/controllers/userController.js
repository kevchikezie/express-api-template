const Password = require("../utils/passwordHasher");
const models = require("../database/models");

class UserController {
	async create(req, res) {
		try {
			const hashedPassword = await Password.hash(req.body.password);

			const user = await models.User.create({
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword
			});

			res.status(201).send(user);
		} catch (error) {
			res.status(400).send(error);
		}
	}

	async index(req, res) {
		try {
			const users = await models.User.findAll();
			res.send(users);
		} catch (error) {
			res.status(500).send();
		}
	}

	async show(req, res) {
		try {
			const user = await models.User.findOne({ where: { id: req.params.id } });

			if (!user) {
				return res.status(404).send();
			}

			res.send(user);
		} catch (error) {
			res.status(500).send();
		}
	}

	async update(req, res) {
		try {
			const user = await models.User.findOne({ where: { id: req.params.id } });

			if (!user) {
				return res.status(404).send();
			}

			await user.update(req.body, { where: { id: req.params.id } });

			res.send();
		} catch (error) {
			res.status(400).send(error);
		}
	}

	async destroy(req, res) {
		try {
			const user = await models.User.findOne({ where: { id: req.params.id } });

			if (!user) {
				return res.status(404).send();
			}
			await user.destroy();

			res.send(user);
		} catch (error) {
			res.status(500).send();
		}
	}
}

module.exports = new UserController();

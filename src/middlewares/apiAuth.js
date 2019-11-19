const Token = require("../utils/tokenManager");
const models = require("../database/models");

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decoded = Token.decode(token);

		const user = await models.User.findOne({
			where: { id: decoded.id },
			include: [
				{
					model: models.UserToken,
					as: "userTokens",
					where: { token, userId: decoded.id }, //Use this to return the exact token
					//where: { userId: decoded.id }, //Use this to return all the token
					attributes: ["token", "userId", "id"]
				}
			]
		});

		if (!user) {
			throw new Error();
		}

		req.token = token;
		req.user = user;

		next();
	} catch (error) {
		res.status(401).send({ error: { code: 401, message: "Unauthenticated" } });
	}
};

module.exports = auth;

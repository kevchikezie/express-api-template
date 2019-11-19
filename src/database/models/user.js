const models = require("./user");

("use strict");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.BIGINT
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
			validate: {
				len: { args: [1, 255], msg: "Name cannot be null" }
			}
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
			set: function(value) {
				this.setDataValue("email", value.toLowerCase());
			},
			unique: {
				args: true,
				msg: "Email address already in use!"
			},
			validate: {
				isEmail: { args: true, msg: "Provide valid email" }
			}
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING,
			validate: {
				len: { args: [8, 255], msg: "Password must be at least 8 characters" }
			}
		},
		image: {
			allowNull: true,
			type: DataTypes.BLOB
		},
		verifiedAt: {
			allowNull: true,
			type: DataTypes.DATE
		}
	});

	User.associate = function(models) {
		User.hasMany(models.UserToken, { foreignKey: "userId", as: "userTokens" });
	};

	return User;
};

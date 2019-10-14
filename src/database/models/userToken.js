"use strict";

module.exports = (sequelize, DataTypes) => {
	const UserToken = sequelize.define(
		"UserToken",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT
			},
			userId: {
				allowNull: false,
				type: DataTypes.BIGINT
			},
			token: {
				allowNull: false,
				type: DataTypes.STRING
			}
		},
		{}
	);

	UserToken.associate = function(models) {
		UserToken.belongsTo(models.User, {
			foreignKey: "userId",
			onDelete: "CASCADE",
			as: "user"
		});
	};

	return UserToken;
};

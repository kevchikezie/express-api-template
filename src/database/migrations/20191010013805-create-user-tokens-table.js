"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("UserTokens", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT
			},
			userId: {
				allowNull: false,
				type: Sequelize.BIGINT,
				references: {
					model: "Users",
					key: "id"
				},
				onDelete: "cascade",
				onUpdate: "cascade"
			},
			token: {
				allowNull: false,
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: true,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: true,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("UserTokens");
	}
};

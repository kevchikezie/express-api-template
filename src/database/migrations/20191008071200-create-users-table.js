"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING
			},
			image: {
				allowNull: true,
				type: Sequelize.BLOB
			},
			verifiedAt: {
				allowNull: true,
				type: Sequelize.DATE
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
		return queryInterface.dropTable("Users");
	}
};

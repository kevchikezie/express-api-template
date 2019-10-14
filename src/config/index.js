module.exports = {
	app: {
		port: process.env.APP_PORT || 9000,
		maintenanceMode: process.env.MAINTENANCE_MODE || false,
		environment: process.env.NODE_ENV || "production" // Options: development || production || test
	}
};

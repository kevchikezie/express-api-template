require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const config = require("./config");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));

// Maintenance mode
app.use((req, res, next) => {
	if (config.app.maintenanceMode) {
		console.log("App is in maintenance mode");
		res
			.status(503)
			.send({ error: "Maintenance is ongoing. We will be back soon!" });
	} else {
		next();
	}
});

app.use(express.json());
app.use(routes);

app.listen(config.app.port, () => {
	console.log(`Server is running on port ${config.app.port}`);
});

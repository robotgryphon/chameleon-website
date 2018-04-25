import * as express from "express";
import { Request, Response, NextFunction } from "express";

import * as path from "path";
import * as config from "dotenv";

config.config();

// Ports to try and use
const port = parseInt(process.env.PORT) || 8080;

// Location of files
const staticPath = path.join(__dirname, "..", "client");

startServer(port);

// Implementation of server
function startServer(port: number) {
	console.log("Creating express server.");
	let app = express();

	app.use("/node_modules", express.static(path.join(staticPath, "node_modules")));

	console.log(`Hosting from ${staticPath}...`);
	app.use(express.static(staticPath));

	app.get("/", (req, res, next) => {
		res.sendFile(path.join(staticPath, "index.html"));
	});

	app.get("*", (req, res, next) => {
		res.status(404).sendFile(path.join(staticPath, "index.html"));
	});

	// Start up express server
	console.log(`Starting on port ${port}...`);
	app.listen(port);

	console.log(`Started at http://localhost:${port}`);
}
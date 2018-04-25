import { task, watch, src, dest } from "gulp";
import { createProject } from "gulp-typescript";

import { server } from "./paths";

let ts = createProject("tsconfig.json", {
	target: "es5",
	module: "commonjs",
	moduleResolution: "node",
	lib: [
		"es6"
	]
});

let buildServer = () => {
	return src(`${server.source.base}/**/*.ts`)
		.pipe(ts())
		.pipe(dest(server.destination.base));
};

task("server", buildServer);

task("server:watch", () => {
	watch(`${server.source.base}/**/*.ts`, buildServer);
});
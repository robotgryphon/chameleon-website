import { task, watch, parallel, src, dest } from "gulp";
import * as sass from "gulp-sass";
import * as webpack from "webpack-stream";
import * as wp from "webpack";
import * as babel from "gulp-babel";
import * as del from "del";
import { Configuration } from "webpack";

import { client } from "./paths";

let wpConfig: Configuration = {
	resolve: {
		extensions: [".ts", ".js"]
	},

	output: {
		filename: "app.js"
	},

	module: {
		rules: [
			{ test: /\.ts$/, loader: "ts-loader" }
		]
	}
};

const DEBUG_MODE = process.env.NODE_ENVIRONMENT === "development";

//region Definitions
function html() {
	return src(`${client.source.root}/**/*.html`)
		.pipe(dest(client.destination.root));
}

function scripts() {
	let js = `${client.source.scripts}/**/*.js`;
	return src(js).pipe(dest(client.destination.scripts));
}
function typescript() {
	let pipeStream = src(`${client.source.typescript}/**/*.ts`)
		.pipe(webpack(wpConfig, wp));

	return pipeStream.pipe(dest(client.destination.scripts));
}

function styles() {
	let styles = `${client.source.styles}/**/*.scss`;

	return src(styles)
		.pipe(sass())
		.pipe(dest(client.destination.styles));
}

function assets() {
	let assets = `${client.source.assets}/**/*`;
	return src(assets).pipe(dest(client.destination.assets));
}
//endregion

//region Watch Definitions
let watchHTML = () => watch(`${client.source.root}/**/*.html`, html);
let watchScripts = () => {
	watch(`${client.source.typescript}/**/*.ts`, typescript);
	watch(`${client.source.scripts}/**/*.js`, scripts);
};

let watchStyles = () => watch(`${client.source.styles}/**/*.scss`, styles);
//endregion

task("client", parallel(html, styles, typescript, assets));
task("client:html", html);
task("client:scripts", parallel(typescript, scripts));
task("client:styles", styles);
task("client:assets", assets);

task("client:watch", parallel(watchHTML, watchScripts, watchStyles));
task("client:watch-html", watchHTML);
task("client:watch-scripts", watchScripts);
task("client:watch-styles", watchStyles);

import { src, dest, task, watch, series } from "gulp";
import { createProject } from "gulp-typescript";
import * as sass from "gulp-sass";
import * as babel from "gulp-babel";
import * as webpack from "webpack-stream";
import * as wp from "webpack";

import { Configuration } from "webpack";

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

let ts = createProject("tsconfig.json");
let clientTS = createProject("tsconfig.json", {
    target: "es6"
});

task("build:html", () => {
    return src("source/client/**/*.html")
        .pipe(dest("build/client"));
});

task("build:styles", () => {
    return src("source/client/styles/**/*.scss")
        .pipe(sass())
        .pipe(dest("build/client/styles"));
});

task("build:fonts", () => {
    return src("source/client/fonts/**/*")
        .pipe(dest("build/client/fonts"));
});

task("build:media", () => {
    return src("source/client/media/**/*")
        .pipe(dest("build/client/media"));
});

task("build:scripts", () => {
    return src("source/client/scripts/**/*")
        .pipe(webpack(wpConfig, wp))
        .pipe(dest("build/client/scripts"));
});

task("client", series("build:html", "build:styles", "build:fonts", "build:media"));

// Watch Tasks
task("watch:html", () => {
    let pages = task("build:html");
    watch("source/client/**/*.html", pages);
});

task("build:server", () => {
    return src("source/server/**/*.ts")
        .pipe(ts())
        .pipe(dest("build/server"));
});

task("watch:server", () => {
    let serverTask = task("build:server");
    watch("source/server/**/*.ts", serverTask);
});
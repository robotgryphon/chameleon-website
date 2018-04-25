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

task("client:html", () => {
    return src("source/client/**/*.html")
        .pipe(dest("build/client"));
});

task("client:styles", () => {
    return src("source/client/styles/**/*.scss")
        .pipe(sass())
        .pipe(dest("build/client/styles"));
});

task("client:fonts", () => {
    return src("source/client/fonts/**/*")
        .pipe(dest("build/client/fonts"));
});

task("client:media", () => {
    return src("source/client/media/**/*")
        .pipe(dest("build/client/media"));
});

task("client:scripts", () => {
    return src("source/client/scripts/**/*")
        .pipe(webpack(wpConfig, wp))
        .pipe(dest("build/client/scripts"));
});

task("client", series("client:html", "client:styles", "client:fonts", "client:media"));

// Watch Tasks
task("watch:html", () => {
    let pages = task("client:html");
    watch("source/client/**/*.html", pages);
});
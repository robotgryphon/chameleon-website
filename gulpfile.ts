import { src, dest, task, watch, series } from "gulp";
import { createProject } from "gulp-typescript";
import * as sass from "gulp-sass";

let ts = createProject("tsconfig.json");

task("build:pages", () => {
    return src("source/client/**/*.html")
        .pipe(dest("build/client"));
});

task("build:styles", () => {
    return src("source/client/styles/**/*.scss")
        .pipe(sass())
        .pipe(dest("build/client/styles"));
});

task("build:media", () => {
    return src("source/client/media/**/*")
        .pipe(dest("build/client/media"));
});

task("client", series("build:pages", "build:styles", "build:media"));

// Watch Tasks
task("watch:pages", () => {
    let pages = task("build:pages");
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
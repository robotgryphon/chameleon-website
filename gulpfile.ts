import * as del from "del";
import { task, src, series, parallel } from "gulp";
import { base } from "./tasks/paths";

import "./tasks/client";
import "./tasks/server";

task("clean", () => {
    return del(base.destination);
});

task("build-all", series("clean", parallel("client", "server")));
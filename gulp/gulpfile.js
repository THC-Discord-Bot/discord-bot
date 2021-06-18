const gulp = require("gulp");
const path = require("path");

const baseDir = path.join(__dirname, "..");
const buildFolder = path.join(baseDir, "build");

const ts = require("./typescript");
ts.handleTs(gulp, buildFolder);

gulp.task("default", gulp.series("scripts", "img", "styles", "html", "other"));

gulp.task("watch", gulp.series("default", function () {
    gulp.watch("../src/js/**/*.ts", gulp.series("scripts"));
}));

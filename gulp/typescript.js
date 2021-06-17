const ts = require("gulp-typescript");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const sourcemaps = require("gulp-sourcemaps");
const webpackOptions = require("./webpack").config;

exports.handleTs = function (gulp, buildFolder, browserSync) {
    gulp.task("scripts", function () {
        const tsProject = ts.createProject("../tsconfig.json");

        return tsProject
            .src()
            .pipe(sourcemaps.init())
            .pipe(tsProject())
            .js.pipe(webpackStream(webpackOptions, webpack))
            .on("error", function (err) {
                console.log(err.toString());

                this.emit("end");
            })
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(buildFolder));
    });
};

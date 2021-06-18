const path = require("path");
const webpack = require("webpack");

module.exports.config = {
    mode: "development",
    entry: "./src/main.ts",
    target: "node",
    context: path.resolve(__dirname, ".."),
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            { test: /\.(png|jpe?g|svg)$/, loader: "ignore-loader" },
            {
                test: /\.ts$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [
                    { loader: "webpack-strip-block" },
                    {
                        loader: "ts-loader",
                    },
                ],
            },
            {
                test: /\.js$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [{ loader: "webpack-strip-block" }],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "..", "build"),
    },
};

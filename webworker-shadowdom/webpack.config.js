module.exports = {
    entry: {
        index: "./index.js"
    },
    output: {
        path: __dirname,
        filename: "[name].min.js"
    },
    plugins: [new (require("worker-plugin"))()],
    devtool: "sourcemap"
}
const path = require("path");
module.exports = {
    entry: "./subjects.demo",
    output: { 
        path: path.resolve(__dirname, "dist"),
        filename: "app.js" 
    },
    mode: 'development',
    devtool: "inline-source-map",
    module: {
        rules:[
        {
            test: /.ts$/,
            loader: "ts-loader"
        }
    ]
    },
    resolve: {
        extensions: [".js",".ts"]
    }
}
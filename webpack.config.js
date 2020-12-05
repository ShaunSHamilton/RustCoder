const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },
  // node: {
  //   __dirname: false,
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.node$/,
      //   loader: "node-loader",
      // },
    ],
  },
  // target: "node14.15",
  // resolve: {
  //   fallback: {
  //     os: require.resolve("os-browserify/browser"),
  //     crypto: require.resolve("crypto-browserify"),
  //   },
  // },
};

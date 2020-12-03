const path = require("path");

module.exports = {
  entry: "./server/server.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },
  node: {
    __dirname: false,
  },
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
      {
        test: /\.node$/,
        use: "node-loader",
      },
    ],
  },
  target: "node12.18",
  // resolve: {
  //   fallback: {
  //     os: require.resolve("os-browserify/browser"),
  //     crypto: require.resolve("crypto-browserify"),
  //   },
  // },
};

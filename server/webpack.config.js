const path = require("path");

module.exports = {
  entry: "./server.js",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "bundle-server.js",
  },
  node: {
    __dirname: false,
  },
  externals: {
    uws: "uws",
    ws: "ws",
    express: "express",
    "socket.io": "socket.io",
    "node-pty": "node-pty",
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
        loader: "node-loader",
      },
    ],
  },
  target: "node",
  // resolve: {
  //   fallback: {
  //     os: require.resolve("os-browserify/browser"),
  //     crypto: require.resolve("crypto-browserify"),
  //   },
  // },
};

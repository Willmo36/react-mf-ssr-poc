const path = require("path");
const webpack = require("webpack");
const baseConfig = require("../../webpack.base.config");

module.exports = {
  ...baseConfig,
  target: "node",
  mode: "production",
  entry: "./src/server/vercel.tsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "server_dist", "api")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, "./tsconfig.server.json"),
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      promotions: false,
      search: false
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /webpack$|webpack-dev-server$/,
    }),
    new webpack.DefinePlugin({
      "process.env.STATIC": JSON.stringify(process.env.STATIC)
    })
  ],
};

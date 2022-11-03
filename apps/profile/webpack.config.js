const path = require("path");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: "./src/client/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, "dist"),
  },
  externals: ['react', 'react-dom'],
  plugins: [
    new ModuleFederationPlugin({
      name: "profilemf",
      filename: 'remoteHome.js',
      exposes: {
        Profile: "./src/components/Profile.tsx",
      },
    }),
  ],
};

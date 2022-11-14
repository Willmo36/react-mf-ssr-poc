const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  target: "web",
  entry: "./src/client/index.tsx",
  mode: "development",
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
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "website",
      remotes: {
        profilemf: "profilemf@http://localhost:3001/js/remoteEntry.js",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
};

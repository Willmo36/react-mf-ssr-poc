const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const baseConfig = require("../../webpack.base.config");

module.exports = {
  ...baseConfig,
  entry: "./src/client/index.tsx",
  output: {filename: 'bundle.js'},
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

const { ModuleFederationPlugin } = require("webpack").container;
const baseConfig = require("../../webpack.base.config");

module.exports = {
  ...baseConfig,
  entry: "./src/client/index.tsx",
  plugins: [
    new ModuleFederationPlugin({
      name: "profilemf",
      filename: "remoteEntry.js",
      exposes: {
        "./Profile": "./src/components/Profile.tsx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
};

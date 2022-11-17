const { ModuleFederationPlugin } = require("webpack").container;
const baseConfig = require("../../webpack.base.config");

module.exports = {
  ...baseConfig,
  entry: "./src/client/index.tsx",
  plugins: [
    new ModuleFederationPlugin({
      name: "promotions",
      filename: "remoteEntry.js",
      exposes: {
        "./SearchEnginePromotions": "./src/components/SearchEnginePromotions.tsx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
};

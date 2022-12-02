const { ModuleFederationPlugin } = require("webpack").container;
const baseConfig = require("../../webpack.base.config");

module.exports = {
  ...baseConfig,
  mode: 'development',
  entry: "./src/client/index.tsx",
  plugins: [
    new ModuleFederationPlugin({
      name: "promotions",
      filename: "remoteEntry.js",
      exposes: {
        "./PromotionSearchResults": "./src/components/PromotionSearchResults.tsx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "@tanstack/react-query": {singleton: true}
      },
    }),
  ],
};

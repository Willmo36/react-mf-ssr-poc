const { ModuleFederationPlugin } = require("webpack").container;
const baseConfig = require("../../webpack.base.config");

module.exports = {
  ...baseConfig,
  entry: "./src/client/index.tsx",
  plugins: [
    new ModuleFederationPlugin({
      name: "search",
      filename: "remoteEntry.js",
      exposes: {
        "./SearchEngineResults": "./src/components/SearchEngineResults.tsx",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "@tanstack/react-query": {singleton: true}
      },
    }),
  ],
};

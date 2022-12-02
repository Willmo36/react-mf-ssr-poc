const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const baseConfig = require("../../webpack.base.config");

module.exports = {
  ...baseConfig,
  mode: 'development',
  entry: "./src/client/index.tsx",
  output: {filename: 'bundle.js'},
  plugins: [
    new ModuleFederationPlugin({
      name: "website",
      remotes: {
        "search": "search@http://localhost:3001/js/remoteEntry.js",
        promotions: "promotions@http://localhost:3002/js/remoteEntry.js"
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "@tanstack/react-query": {singleton: true}
      },
    }),
  ],
};

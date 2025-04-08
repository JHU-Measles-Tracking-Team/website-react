const path = require("path");

module.exports = {
  features: {
    postcss: false,
  },
  stories: [
    "../../web/src/**/*.stories.mdx",
    "../../web/src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  staticDirs: ["../../web/public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: { name: "@storybook/nextjs", options: {} },
  webpackFinal: async (config) => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve("./../web/src"),
    ];

    return config;
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          node: "current",
        },
        useBuiltIns: false,
      },
    ],
    ["@babel/preset-typescript"],
  ],
  plugins: [
    "@babel/plugin-syntax-bigint",
    "@babel/plugin-transform-typescript",
    "@babel/preset-typescript",
  ],
};

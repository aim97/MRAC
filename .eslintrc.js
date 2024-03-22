module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "standard-with-typescript",
    "some-other-config-you-use",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};

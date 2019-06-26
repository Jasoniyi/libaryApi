module.exports = {
  extends: "airbnb-base",

  rules: {
    "no-console": 0,
    "no-param-reassign": [2, { props: false }],
    "prefer-destructuring": 0,
    "arrow-body-style": 0,
    "comma-dangle": 0,
    semi: ["error", "always"],
    quotes: ["error", "single"]
  },
  env: {
    commonjs: true,
    node: true,
    mocha: true
  }
};

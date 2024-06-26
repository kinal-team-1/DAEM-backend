module.exports = {
  rules: {
    "enforce-custom-error": require("./enforce-custom-error.cjs"),
    "enforce-try-catch-in-controller": require("./enforce-try-catch-in-controller.cjs"),
    "enforce-consistent-return-express": require("./enforce-consistent-return-express.cjs"),
    "enforce-logger": require("./enforce-logger.cjs"),
    "enforce-japa-imports-in-tests": require("./enforce-japa-imports-in-tests.cjs"),
    "enforce-then-on-await-client-calls": require("./enforce-then-on-await-client-calls.cjs"),
  },
  configs: {
    recommended: {
      plugins: ["@joao-cst"],
      rules: {
        "@joao-cst/enforce-custom-error": "error",
        "@joao-cst/enforce-try-catch-in-controller": "error",
        "@joao-cst/enforce-consistent-return-express": "error",
        "@joao-cst/enforce-logger": "error",
        "@joao-cst/enforce-japa-imports-in-tests": "error",
        "@joao-cst/enforce-then-on-await-client-calls": "error",
      },
    },
  },
};

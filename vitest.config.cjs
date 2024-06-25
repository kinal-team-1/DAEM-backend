const {defineConfig} = require("vitest/config")

export default defineConfig({
  test: {
    // ...
    setupFiles: ["./setup-test.js"],
  },
});

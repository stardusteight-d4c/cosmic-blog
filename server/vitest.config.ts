import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@domain": path.resolve(__dirname, "./src/domain"),
      "@app": path.resolve(__dirname, "./src/application"),
    },
  },
});

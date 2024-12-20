import { defineConfig } from "vitest/config";
import * as path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.{js,ts,jsx,tsx}"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

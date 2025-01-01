import { defineConfig } from "vitest/config";
import * as path from "path";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.{js,ts,jsx,tsx}"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // fileParallelism: false
  }
});

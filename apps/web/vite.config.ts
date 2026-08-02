import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tanstackRouter(), react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@repo/shared": path.resolve(__dirname, "../../packages/shared/src"),
      "@repo/users": path.resolve(__dirname, "../../packages/users/src"),
      "@repo/todos": path.resolve(__dirname, "../../packages/todos/src"),
    },
  },
});

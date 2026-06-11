import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

async function netlifyPlugin(): Promise<PluginOption> {
  // Only active during `vite build` — no-op in dev
  if (process.env.NODE_ENV !== "production" && process.argv.includes("dev")) {
    return null;
  }
  try {
    const { nitro } = await import("nitro/vite");
    return nitro({ preset: "netlify" }) as PluginOption;
  } catch {
    return null;
  }
}

export default defineConfig(async () => ({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    react(),
    await netlifyPlugin(),
  ],
  css: { transformer: "lightningcss" },
  resolve: {
    alias: { "@": `${process.cwd()}/src` },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: { host: "::", port: 8080 },
}));

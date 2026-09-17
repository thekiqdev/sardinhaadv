import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      srcDirectory: "src",
      server: { entry: "server" },
    }),
    viteReact(),
    nitro({
      preset: "node-server",
      routeRules: {
        "/assets/**": {
          headers: { "cache-control": "public, max-age=31536000, immutable" },
        },
      },
    } as { preset: string; routeRules: Record<string, { headers: Record<string, string> }> }),
  ],
});

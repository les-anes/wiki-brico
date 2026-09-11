import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { createElement } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { defineConfig, type Plugin } from "vite";

const entry = fileURLToPath(new URL("./src/main.tsx", import.meta.url));

/**
 * Sert chaque route par un rendu serveur du document complet, comme la
 * production. Les fichiers (assets, favicon, sources) sont laissés à Vite.
 */
function documentMiddleware(): Plugin {
  return {
    name: "wikibrico-document",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const url = request.url ?? "/";
        const pathname = url.split("?")[0];
        if (
          request.method !== "GET" ||
          pathname.startsWith("/@") ||
          pathname.includes(".")
        )
          return next();
        try {
          const { Document } = await server.ssrLoadModule("/src/document.tsx");
          const { matchRoute } =
            await server.ssrLoadModule("/src/lib/routes.ts");
          const { tutorials } =
            await server.ssrLoadModule("/src/data/index.ts");
          const { prelude } = await prerenderToNodeStream(
            createElement(Document, {
              initialPath: url,
              siteUrl: `http://${request.headers.host ?? "localhost:5173"}`,
              assets: { css: [], modules: ["/@vite/client", "/src/main.tsx"] },
            }),
          );
          let html = "";
          for await (const chunk of prelude) html += chunk;
          response.statusCode =
            matchRoute(tutorials, url).kind === "notFound" ? 404 : 200;
          response.setHeader("Content-Type", "text/html; charset=utf-8");
          response.end(html);
        } catch (error) {
          server.ssrFixStacktrace(error as Error);
          next(error);
        }
      });
    },
  };
}

export default defineConfig({
  appType: "custom",
  plugins: [react(), documentMiddleware()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: {
    manifest: true,
    rollupOptions: { input: entry },
  },
});

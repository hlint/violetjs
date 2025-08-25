import fs from "node:fs/promises";
import http from "node:http";
import express from "express";
import dbInitialize from "@/db/initialize.ts";
import { env } from "@/lib/env.server.ts";
import handleApp from "./handle-app.ts";
import { handleSsrHtml } from "./handle-ssr-html.ts";

// Initialize DB
await dbInitialize();

// Constants
const port = env.PORT;

// Create http server
const app = express();
const server = http.createServer(app);

// Add Vite or respective production middlewares
const { createServer } = await import("vite");
const vite = await createServer({
  appType: "custom",
  base: "/",
  server: { hmr: { server }, middlewareMode: true },
});
app.use(vite.middlewares);

handleApp(app);

// Serve HTML
app.use("*all", async (req, res) => {
  try {
    const url = req.originalUrl;

    let template = "";
    // Always read fresh template in development
    template = await fs.readFile("./index.html", "utf-8");
    template = await vite!.transformIndexHtml(url, template);
    const render: typeof import("@/entry-server.tsx").render = (
      await vite!.ssrLoadModule("/src/entry-server.tsx")
    ).render;

    const html = await handleSsrHtml({
      resLocals: res.locals,
      url,
      template,
      render,
    });

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    if (e instanceof Error) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    } else {
      console.error(e);
      res.status(500).end("Internal Server Error");
    }
  }
});

// Start http server
server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

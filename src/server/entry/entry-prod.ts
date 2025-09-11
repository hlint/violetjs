import http from "node:http";
import express from "express";
import fs from "fs-extra";
import open from "open";
import sirv from "sirv";
import dbInitialize from "@/db/initialize.ts";
import { env } from "@/lib/env.server.ts";
import handleExpress from "../handle-express.ts";
import ssgInitialize from "../ssg/ssg-initialize.ts";
import {
  getCompiledServerRender,
  handleSsrHtml,
} from "./utils/handle-ssr-html.ts";

// Initialize DB
await dbInitialize();

// Initialize SSG
await ssgInitialize();

// Constants
const port = env.PORT;

// Cached production assets
const templateHtml = await fs.readFile("./client/index.html", "utf-8");

// Create http server
const app = express();
const server = http.createServer(app);

const compression = (await import("compression")).default;
app.use(compression());
await fs.ensureDir("./runtime/ssg");
app.use("/", sirv("./runtime/ssg", { extensions: ["html"] }));
app.use("/", sirv("./client", { extensions: ["html"] }));
app.use("/", sirv("./public", { extensions: ["html"] }));

handleExpress(app);

const render = await getCompiledServerRender();
// Serve HTML
app.use("*all", async (req, res) => {
  try {
    const html = await handleSsrHtml({
      resLocals: res.locals,
      url: req.originalUrl,
      template: templateHtml,
      render,
    });

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.stack);
    } else {
      console.error(e);
    }
    res.status(500).end("Internal Server Error");
  }
});

// Start http server
server.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log(`Server started at ${url}`);
  if (env.AUTO_OPEN_BROWSER) {
    open(url);
  }
});

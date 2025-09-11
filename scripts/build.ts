import fs from "fs-extra";
import { cleanDist, run } from "./utils";

async function build() {
  await run("bun run test");
  await cleanDist();
  await run("vite build --outDir dist/client");
  await run(
    "vite build --ssr src/server/server-render.tsx --outDir dist/server"
  );
  await run(
    "bun build --minify dist/server/server-render.js --outfile dist/server/server-render-bundle.js --target bun"
  );
  await fs.remove("dist/server/server-render.js");
  await run(
    "bun build --minify src/server/entry/entry-prod.ts --outfile dist/app.js --target bun"
  );
  await fs.copy(".env.example", "dist/.env");
  await fs.copy("drizzle", "dist/drizzle");
  await fs.copy("public", "dist/public");
}

build();

import fs from "fs-extra";
import pLimit from "p-limit";
import { isDev } from "@/lib/env.server";
import {
  getCompiledServerRender,
  handleSsrHtml,
} from "../entry/utils/handle-ssr-html";
import { mainPaths2langPaths, pathnameToPageCacheFilepath } from "./utils";

export default async function updatePageCaches(
  paths: string[] | string,
  skipLangPrefix: boolean = false,
) {
  if (isDev) {
    return;
  }
  const pathsArr = Array.isArray(paths) ? paths : [paths];
  const pathsFixed = skipLangPrefix ? pathsArr : mainPaths2langPaths(pathsArr);
  const htmlTemplatePath = "./index.html";
  if (!fs.existsSync(htmlTemplatePath)) {
    return;
  }
  const template = await fs.readFile(htmlTemplatePath, "utf-8");
  const render = await getCompiledServerRender();
  const limit = pLimit(8);
  const tasks = pathsFixed.map((url) =>
    limit(async () => {
      const html = await handleSsrHtml({
        resLocals: {},
        url,
        template,
        render,
      });
      const metaData = {
        generatedAt: new Date().toISOString(),
      };
      const outputPath = pathnameToPageCacheFilepath(url);
      await fs.ensureFile(outputPath);
      await fs.writeFile(
        outputPath,
        `<!--${JSON.stringify(metaData)}-->\n${html}`,
      );
    }),
  );
  await Promise.all(tasks);
}

import fs from "fs-extra";
import {
  getCompiledServerRender,
  handleSsrHtml,
} from "../entry/utils/handle-ssr-html";

export default async function ssgUpdate(urls: string[]) {
  const htmlTemplatePath = "./index.html";
  if (!fs.existsSync(htmlTemplatePath)) {
    return;
  }
  const template = await fs.readFile(htmlTemplatePath, "utf-8");
  const render = await getCompiledServerRender();
  for (const url of urls) {
    const html = await handleSsrHtml({
      resLocals: {},
      url,
      template,
      render,
    });
    const outputPath = `./runtime/ssg/${url.replace("/", "") || "index"}.html`;
    await fs.ensureFile(outputPath);
    await fs.writeFile(outputPath, html);
  }
}

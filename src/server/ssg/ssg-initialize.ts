import fs from "fs-extra";
import ssgUpdate from "./ssg-update";
import getDefaultSsgUrls from "./ssg-urls";

export default async function ssgInitialize() {
  const markFile = "./runtime/.ssg-initialized";
  if (fs.existsSync(markFile)) {
    return;
  }
  const urls = await getDefaultSsgUrls();
  console.log("SSG: Updating static files...");
  await fs.emptyDir("./runtime/ssg");
  await ssgUpdate(urls).catch((err) => {
    console.error("SSG: Failed to update static files", err);
  });
  console.log("SSG: Static files updated");
  await fs.ensureFile(markFile);
  await fs.writeFile(markFile, "Delete me and restart to re-initialize ssg");
}

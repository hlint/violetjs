import fs from "fs-extra";
import ssgUpdate from "./ssg-update";
import getDefaultSsgUrls from "./ssg-urls";

export default async function ssgInitialize() {
  console.log("Generating SSG");
  const urls = await getDefaultSsgUrls();
  await fs.emptyDir("./runtime/ssg");
  await ssgUpdate(urls).catch((err) => {
    console.error("SSG: Failed to update static files", err);
  });
}

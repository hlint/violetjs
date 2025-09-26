import fs from "fs-extra";
import { serverRoutes } from "@/routes-server";
import updatePageCaches from "./update-page-caches";
import { getSsgUrlsFromRoutes } from "./utils";

export default async function ssgGeneration() {
  console.log("Generating SSG");
  const urls = await getSsgUrlsFromRoutes(serverRoutes);
  await fs.emptyDir("./runtime/pages");
  await updatePageCaches(urls, true);
}

import fs from "fs-extra";
import z from "zod";
import dbInitialize from "@/db/initialize";
import ssgInitialize from "@/server/ssg/ssg-initialize";

export default async function prodInitialize() {
  const markFile = "./runtime/initialize-info.json";
  const initializeTime = await tryReadBuildTimeFromJson(markFile);
  const buildTime = await tryReadBuildTimeFromJson("./build-info.json");
  if (initializeTime === buildTime) {
    return;
  }
  await dbInitialize();
  await ssgInitialize();
  await fs.writeJson(markFile, { buildTime });
  console.log("Initialized");
}

async function tryReadBuildTimeFromJson(filePath: string) {
  let data: { buildTime: string } = { buildTime: "" };
  try {
    data = z
      .object({
        buildTime: z.string(),
      })
      .parse(await fs.readJson(filePath));
  } catch (_error) {
    // console.log("Initialize info not found or invalid");
  }
  return data.buildTime;
}

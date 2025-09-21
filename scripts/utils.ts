import { execa } from "execa";
import fs from "fs-extra";

export async function cleanDist() {
  await fs.remove("dist");
}

export function run(command: string) {
  return execa(command, { stdio: "inherit", shell: true });
}

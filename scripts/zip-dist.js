import archiver from "archiver";
import fs from "fs-extra";

async function zipDist() {
  const distPath = "dist";
  const zipPath = "dist.zip";

  if (!(await fs.pathExists(distPath))) {
    console.error("❌ dist directory does not exist");
    process.exit(1);
  }

  if (await fs.pathExists(zipPath)) {
    await fs.remove(zipPath);
  }

  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  output.on("close", () => {
    console.log(`✅ Created ${zipPath} (${archive.pointer()} bytes)`);
  });

  archive.on("error", (err) => {
    console.error("❌ Archive error:", err);
    process.exit(1);
  });

  archive.pipe(output);
  archive.directory(distPath, false);
  await archive.finalize();
}

zipDist().catch(console.error);

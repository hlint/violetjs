import { search } from "@inquirer/prompts";
import { run } from "./utils";

// --windows-icon & --windows-hide-console are somehow not working(9-9-2025)
const buildCommand = `bun build --compile --minify dist/app.js`;

const platforms = [
  { name: "linux-x64", target: "bun-linux-x64" },
  { name: "linux-arm64", target: "bun-linux-arm64" },
  { name: "macos-x64", target: "bun-darwin-x64" },
  { name: "macos-arm64", target: "bun-darwin-arm64" },
  { name: "windows-x64", target: "bun-win32-x64" },
];

const commands = [
  "current platform",
  "all platforms",
  ...platforms.map((platform) => platform.name),
];

const answer = await search({
  message: "Select platform that you want to build",
  source: async (input) => {
    return commands.filter((command) => command.includes(input ?? ""));
  },
});

if (answer === "current platform") {
  await buildCurrent();
} else if (answer === "all platforms") {
  await buildAll();
} else {
  await build(answer as string);
}

async function buildCurrent() {
  await run(`${buildCommand} --outfile dist/app --target bun`);
}

async function buildAll() {
  for (const platform of platforms) {
    await build(platform.name);
  }
}

async function build(platformName: string) {
  const platform = platforms.find((platform) => platform.name === platformName);
  if (!platform) {
    console.error("❌ Platform not found");
    process.exit(1);
  }
  const fileName = `dist/app-${platformName}.exe`;
  await run(
    `${buildCommand} --outfile ${fileName} --target ${platform.target}`,
  );
}

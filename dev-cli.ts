import { spawn } from "node:child_process";
import { search } from "@inquirer/prompts";
import { scripts } from "./package.json";

const commands = [
  "dev:hot",
  "dev:preview",
  "db:generate",
  "i18n:extract",
  "i18n:compile",
  "test",
  "lint",
  "build",
  "more...",
];

let answer = await search({
  message: "Select from commonly used commands",
  source: async (input) => {
    return commands.filter((command) => command.includes(input ?? ""));
  },
});

if (answer === "more...") {
  answer = await search({
    message: "Select from all available commands",
    source: async (input) => {
      return Object.keys(scripts).filter((script) =>
        script.includes(input ?? "")
      );
    },
  });
}

await executeCommand(`bun run ${answer}`).catch((error) => {
  console.error(error);
  process.exit(1);
});

function executeCommand(command: string, cwd?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const process = spawn(command, { shell: true, cwd, stdio: "inherit" });
    process.on("close", (code) => {
      if (code !== 0) {
        reject(`Command exited with code ${code}`);
      } else {
        resolve("done");
      }
    });
  });
}

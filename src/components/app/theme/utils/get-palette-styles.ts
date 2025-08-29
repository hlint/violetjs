import { palettes } from "../palettes";

export function getPaletteStyles(name: string) {
  const skin = palettes.find((item) => item.name === name);
  if (!skin) {
    return "";
  }
  const { cssVars } = skin;
  return `
.html-root {
${Object.entries(cssVars.theme)
  .map(([key, value]) => `--${key}: ${value};`)
  .join("\n")}

${Object.entries(cssVars.light)
  .map(([key, value]) => `--${key}: ${value};`)
  .join("\n")}
}

.html-root.dark {
${Object.entries(cssVars.dark)
  .map(([key, value]) => `--${key}: ${value};`)
  .join("\n")}
}
  `;
}

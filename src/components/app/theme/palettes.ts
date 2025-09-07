import registry from "./registry.json";

export const palettes = registry.items.sort((a, b) =>
  a.name.localeCompare(b.name)
);

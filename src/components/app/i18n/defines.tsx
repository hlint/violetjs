import { assert } from "es-toolkit";

export const langs = ["en", "zh-CN"] as const;
export const DEFAULT_LANG = "en";
export const locales = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "zh-CN",
    name: "简体中文",
  },
];

assert(
  langs.every((lang) => locales.some((locale) => locale.code === lang)),
  "langs and locales must have the same values"
);

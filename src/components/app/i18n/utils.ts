import { DEFAULT_LANG, langs } from "./defines";

export function parseLangFromUrl(url: string) {
  const lang = url.split("/")[1];
  return langs.includes(lang) ? lang : DEFAULT_LANG;
}

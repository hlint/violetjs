import * as cheerio from "cheerio";
import { renderToString } from "react-dom/server";

export function cheerioRender(component: React.ReactNode) {
  const html = renderToString(component);
  const $ = cheerio.load(html);
  return $;
}

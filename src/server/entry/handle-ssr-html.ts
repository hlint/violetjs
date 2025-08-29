import type { HelmetDataContext } from "@dr.pogodin/react-helmet";
import type { Session, ThemeColorMode, ThemePalette } from "../../lib/types.ts";
import ssrLoader, { type SsrLoaderContext } from "../ssr-loader.ts";
import { renderHtml } from "./render-html.ts";

type CompiledServerRender = typeof import("@/entry-server.tsx").render;

export async function getCompiledServerRender() {
  const modulePath = "./server/entry-server-bundle.js";
  return (await import(modulePath)).render as CompiledServerRender;
}

export async function handleSsrHtml({
  resLocals,
  url,
  template,
  render,
}: {
  resLocals: any;
  url: string;
  template: string;
  render: CompiledServerRender;
}) {
  const context = {
    session: resLocals.session as Session,
    themeColorMode: (resLocals.themeColorMode || "system") as ThemeColorMode,
    themeIsDark: resLocals.themeIsDark === "true",
    themePalette: (resLocals.themePalette || "default") as ThemePalette,
  } satisfies SsrLoaderContext;
  const ssrData = await ssrLoader(url, context);
  const helmetContext: HelmetDataContext = {};
  const rendered = render(url, ssrData, helmetContext);
  const html = renderHtml({
    template,
    rendered,
    ssrData,
    helmetContext,
  });
  return html;
}

import type { HelmetDataContext } from "@dr.pogodin/react-helmet";
import type { Session } from "../../../lib/types.ts";
import ssrLoader, { type SsrLoaderContext } from "../../ssr-loader.ts";
import { assembleHtmlPage } from "./assemble-html-page.ts";

type CompiledServerRender =
  typeof import("@/server/server-render.tsx").serverRender;

export async function getCompiledServerRender() {
  const modulePath = "./server" + "/server-render-bundle.js"; // Avoid bundling
  return (await import(modulePath)).serverRender as CompiledServerRender;
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
  } satisfies SsrLoaderContext;
  const ssrData = await ssrLoader(url, context);
  const helmetContext: HelmetDataContext = {};
  const rendered = render(url, ssrData, helmetContext);
  const html = assembleHtmlPage({
    template,
    rendered,
    ssrData,
    helmetContext,
    lang: ssrData.lang,
  });
  return html;
}

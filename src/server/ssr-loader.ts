import { call } from "@orpc/server";
import { parseLangFromUrl } from "@/components/app/i18n/utils";
import type { Session } from "@/lib/types";
import { getTodos } from "@/pages/demo/todo/actions.server";
import type { SsrData } from "../lib/ssr-data";

export type SsrLoaderContext = {
  session: Session;
};

export default async function ssrLoader(
  url: string,
  context: SsrLoaderContext,
): Promise<SsrData> {
  const osOptions = { context };
  const urlObj = new URL(url, "http://localhost");
  const pathname = urlObj.pathname;
  const ssrData: SsrData = {
    _memo: `pathname: ${pathname}`,
    lang: parseLangFromUrl(url),
    swrFallback: { session: context.session },
  };
  if (pathname === "/") {
    ssrData._memo = "page:home";
  }
  if (pathname === "/demo/todo") {
    ssrData._memo = "page: demo/todo";
    ssrData.swrFallback.todos = await call(getTodos, null, osOptions).catch(
      () => undefined,
    );
  }
  return ssrData;
}

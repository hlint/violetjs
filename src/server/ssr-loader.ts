import { call } from "@orpc/server";
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
  const ssrData: SsrData = { swrFallback: { session: context.session } };
  const urlObj = new URL(url, "http://localhost");
  if (urlObj.pathname === "/demo/todo") {
    ssrData.swrFallback.todos = await call(getTodos, null, osOptions).catch(
      () => undefined,
    );
  }
  return ssrData;
}

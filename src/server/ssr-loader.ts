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
): Promise<Partial<SsrData>> {
  const osOptions = { context };
  const ssrData = {} as Partial<SsrData>;
  ssrData.session = context.session;
  const urlObj = new URL(url, "http://localhost");
  if (urlObj.pathname === "/demo/todo") {
    ssrData.demo_todos = await call(getTodos, null, osOptions).catch(
      () => undefined,
    );
  }
  return ssrData;
}

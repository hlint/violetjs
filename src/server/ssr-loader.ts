import { matchRoutes, type RouteObject } from "react-router";
import { parseLangFromUrl } from "@/components/app/i18n/utils";
import { isDev } from "@/lib/env.server";
import type { Session } from "@/lib/types";
import { type ServerRouteObject, serverRoutes } from "@/routes-server";
import type { SsrData } from "../lib/ssr-data";

export type SsrLoaderInputs = {
  session: Session;
};

export default async function ssrLoader(
  url: string,
  inputs: SsrLoaderInputs,
): Promise<SsrData> {
  const ssrData: SsrData = {
    lang: parseLangFromUrl(url),
    swrFallback: { session: inputs.session },
  };
  const matches = matchRoutes(serverRoutes as RouteObject[], url);
  if (matches) {
    const context = {};
    for (const match of matches) {
      const route = match.route as ServerRouteObject;
      if (route.ssrHandle) {
        const shouldContinue = await route
          .ssrHandle({
            url,
            osOptions: { context: { session: inputs.session } },
            langPath: match.pathname,
            mainPath: match.pathname.replace(/^\/[^/]+/, ""),
            params: match.params,
            context,
            ssrData,
          })
          .catch((error) => {
            if (isDev) {
              console.error(error);
            }
          });
        if (!shouldContinue) {
          break;
        }
      }
    }
  }
  return ssrData;
}

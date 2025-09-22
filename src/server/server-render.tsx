import type { HelmetDataContext } from "@dr.pogodin/react-helmet";
import { i18n } from "@lingui/core";
import { StrictMode } from "react";
import { renderToString } from "react-dom/server.node";
import { StaticRouter } from "react-router";
import App from "../app";
import { refSsrData, type SsrData } from "../lib/ssr-data";

export function serverRender(
  url: string,
  ssrData: SsrData,
  helmetContext: HelmetDataContext
) {
  refSsrData.current = ssrData;
  i18n.activate(ssrData.lang);

  const app = (
    <StrictMode>
      <StaticRouter location={url}>
        <App helmetContext={helmetContext} />
      </StaticRouter>
    </StrictMode>
  );
  const rendered = renderToString(app);
  refSsrData.current = undefined;
  return rendered;
}

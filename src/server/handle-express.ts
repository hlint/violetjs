import { ExpressAuth, getSession } from "@auth/express";
import { match } from "@formatjs/intl-localematcher";
import { RPCHandler } from "@orpc/server/node";
import cookieParser from "cookie-parser";
import express from "express";
import { DEFAULT_LANG, langs } from "@/components/app/i18n/defines.tsx";
import type { OsContext } from "../lib/orpc-client.ts";
import type { Session } from "../lib/types.ts";
import { authConfig } from "./auth.ts";
import { orpcRouter } from "./orpc-router.ts";

export default function handleExpress(app: express.Express) {
  const rpcHandler = new RPCHandler(orpcRouter);

  // handle session
  app.use(async (req, res, next) => {
    const session = await getSession(req, authConfig);
    res.locals.session = {
      loggedIn: !!session?.user,
      username: session?.user?.name || "",
      email: session?.user?.email || "",
      image: session?.user?.image || "",
    } satisfies Session;
    next();
  });

  // handle auth
  app.use("/auth", async (req, res, next) => {
    ExpressAuth(authConfig)(req, res, next);
  });

  // handle oRPC
  app.use("/rpc", async (req, res, next) => {
    const { matched } = await rpcHandler.handle(req, res, {
      prefix: "/rpc",
      context: {
        session: res.locals.session as Session,
      } satisfies OsContext,
    });

    if (matched) {
      return;
    }

    next();
  });

  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded());

  // parse application/json
  app.use(express.json());

  // parse text/plain
  app.use(express.text());

  // parse cookies
  app.use(cookieParser());

  // handle cookies
  app.use(async (_req, _res, next) => {
    // res.locals.themeColorMode = req.cookies[storageKeyColorMode];
    return next();
  });

  // redirect to the correct language
  app.get("/", async (req, res) => {
    let lang = DEFAULT_LANG;
    try {
      lang = match(
        [
          req.cookies["violet-ui-lang"],
          req.headers["accept-language"]?.replaceAll(";", ",").split(",")[0],
        ].filter(Boolean),
        langs,
        DEFAULT_LANG
      );
    } catch (_error) {}

    return res.redirect(`/${lang}`);
  });
}

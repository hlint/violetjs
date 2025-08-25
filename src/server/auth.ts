import type { ExpressAuthConfig } from "@auth/express";
import GitHub from "@auth/express/providers/github";

export const authConfig: ExpressAuthConfig = {
  trustHost: true,
  providers: [GitHub],
  debug: false,
  logger: {
    debug: (message) => {
      console.log(message);
    },
  },
};

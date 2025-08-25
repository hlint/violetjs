import { osBase } from "@/lib/orpc-client";

export const getSession = osBase.handler(async ({ context }) => {
  return context.session;
});

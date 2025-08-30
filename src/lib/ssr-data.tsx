import type { DemoTodo } from "@/db/schema";
import type { Session } from "./types";

export type SsrData = {
  swrFallback: {
    todos?: DemoTodo[];
    session: Session;
  };
};

export const refSsrData = {
  current: {} as SsrData | undefined,
};

export function getSsrData() {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return refSsrData.current;
  }
  return window.__SSR_DATA__;
}

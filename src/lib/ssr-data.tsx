import type { DemoTodo } from "@/db/schema";
import type { Session } from "./types";
import { isServer } from "./utils";

export type SsrData = {
  _memo: string;
  lang: string;
  swrFallback: {
    todos?: DemoTodo[];
    session: Session;
  };
};

export const refSsrData = {
  current: {} as SsrData | undefined,
};

export function getSsrData() {
  if (isServer()) {
    return refSsrData.current;
  }
  return window.__SSR_DATA__;
}

import type { Session } from "./types";
import { isServer } from "./utils";

export type SsrData = {
  lang: string;
  swrFallback: {
    session: Session;
  } & Record<string, unknown>;
} & Record<string, unknown>;

export const refSsrData = {
  current: {} as SsrData | undefined,
};

export function getSsrData() {
  if (isServer()) {
    return refSsrData.current;
  }
  return window.__SSR_DATA__;
}

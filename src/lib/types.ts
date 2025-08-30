import type { SsrData } from "./ssr-data";
import "@total-typescript/ts-reset";
import "@total-typescript/ts-reset/dom";

declare global {
  interface Window {
    __SSR_DATA__?: SsrData;
  }
}

export type Session = {
  loggedIn: boolean;
  username: string;
  email: string;
  image: string;
};

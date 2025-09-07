import type { SsrData } from "./ssr-data";

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

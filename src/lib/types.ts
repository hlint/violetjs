import type { SsrData } from "./ssr-data";
import "@total-typescript/ts-reset";
import "@total-typescript/ts-reset/dom";

declare global {
  interface Window {
    __SSR_DATA__?: Partial<SsrData>;
  }
}

export type Session = {
  loggedIn: boolean;
  username: string;
  email: string;
  image: string;
};

export const storageKeyColorMode = "violet-ui-color-mode";
export const storageKeyIsDark = "violet-ui-is-dark";
export const storageKeyPalette = "violet-ui-palette";
export type ThemeColorMode = "dark" | "light" | "system";
export type ThemePalette = string;

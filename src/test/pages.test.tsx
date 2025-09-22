import { StaticRouter } from "react-router";
import { expect, test } from "vitest";
import App from "@/app";
import { DEFAULT_LANG } from "@/components/app/i18n/defines";
import { cheerioRender } from "./utils";

function Page({ url }: { url: string }) {
  return (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}

test("render home page", async () => {
  // render home page without any errors
  cheerioRender(<Page url={`/${DEFAULT_LANG}`} />);
});

test("render sign-in page", async () => {
  const $ = cheerioRender(<Page url={`/${DEFAULT_LANG}/auth/sign-in`} />);
  expect($('div[data-slot="card-title"]').text()).toBe("Sign In");
});

test("render sign-out page", async () => {
  const $ = cheerioRender(<Page url={`/${DEFAULT_LANG}/auth/sign-out`} />);
  expect($('div[data-slot="card-title"]').text()).toBe("Sign Out");
});

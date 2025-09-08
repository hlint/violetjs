import { StaticRouter } from "react-router";
import { expect, test } from "vitest";
import App from "@/app";
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
  cheerioRender(<Page url="/" />);
});

test("render sign-in page", async () => {
  const $ = cheerioRender(<Page url="/auth/sign-in" />);
  expect($('div[data-slot="card-title"]').text()).toBe("Sign In");
});

test("render sign-out page", async () => {
  const $ = cheerioRender(<Page url="/auth/sign-out" />);
  expect($('div[data-slot="card-title"]').text()).toBe("Sign Out");
});

import { langs } from "@/components/app/i18n/defines";

export default async function getDefaultSsgUrls() {
  return ["", "/auth/sign-in", "/auth/sign-out", "/demo/todo"].flatMap((t) =>
    langs.map((l) => `/${l}${t}`),
  );
}

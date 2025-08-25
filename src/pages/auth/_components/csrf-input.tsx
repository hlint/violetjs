import { useEffect, useState } from "react";

export default function CsrfInput({ csrfToken }: { csrfToken: string }) {
  return <input type="hidden" name="csrfToken" value={csrfToken} />;
}

export function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState("");
  useEffect(() => {
    fetch("/auth/csrf")
      .then((res) => res.json())
      .then((data) => setCsrfToken((data as { csrfToken: string }).csrfToken));
  }, []);
  return csrfToken;
}

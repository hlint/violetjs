import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { toast } from "sonner";
import App from "./app";

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  {
    onRecoverableError: (error, errorInfo) => {
      console.error(error, errorInfo);
      setTimeout(() => {
        if (import.meta.env.DEV) {
          toast.error("Recoverable Error Occurred");
        }
      }, 0);
    },
  }
);

import { useEffect } from "react";
import { toast } from "sonner";

export default function ErrorNotifier() {
  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      if (import.meta.env.DEV) {
        toast.error(error.message);
      }
    };
    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  return null;
}

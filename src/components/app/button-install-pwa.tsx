import { MonitorSmartphoneIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
}

export function ButtonInstallPWA() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    });
  }, []);
  if (!deferredPrompt) {
    return null;
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            if (deferredPrompt) {
              deferredPrompt.prompt();
            }
          }}
        >
          <MonitorSmartphoneIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Install PWA</TooltipContent>
    </Tooltip>
  );
}

import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useThemeStore } from "@/store/_root";

export function ThemeModeSwitcher() {
  const colorMode = useThemeStore((s) => s.colorMode);
  const toggleColorMode = useThemeStore((s) => s.toggleColorMode);
  const setColorMode = useThemeStore((s) => s.setColorMode);
  const setBoundingClientRect = useThemeStore((s) => s.setBoundingClientRect);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            setBoundingClientRect(
              e.currentTarget.getBoundingClientRect() || null,
            );
            toggleColorMode();
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setBoundingClientRect(
              e.currentTarget.getBoundingClientRect() || null,
            );
            setColorMode("system");
          }}
        >
          {colorMode === "dark" && <MoonIcon />}
          {colorMode === "light" && <SunIcon />}
          {colorMode === "system" && <SunMoonIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>Color Mode: {colorMode}</TooltipContent>
    </Tooltip>
  );
}

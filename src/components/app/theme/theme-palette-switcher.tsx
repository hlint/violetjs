import { randomInt } from "es-toolkit";
import { PaletteIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useThemeStore } from "@/store/_root";
import { palettes } from "./palettes";

export function ThemePaletteSwitcher() {
  const skinNames = useRef(palettes.map((skin) => skin.name));
  const palette = useThemeStore((s) => s.palette);
  const setPalette = useThemeStore((s) => s.setPalette);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const nextIndex = randomInt(0, skinNames.current.length - 1);
            setPalette(skinNames.current[nextIndex]);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setPalette("default");
          }}
        >
          <PaletteIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Palette: {palette}</TooltipContent>
    </Tooltip>
  );
}

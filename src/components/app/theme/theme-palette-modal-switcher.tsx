import { PaletteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/_root";
import { palettes } from "./palettes";
import { colorFormatter } from "./utils/color-converter";

export function ThemePaletteModalSwitcher() {
  const palette = useThemeStore((s) => s.palette);
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <PaletteIcon />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Palette: {palette}</TooltipContent>
      </Tooltip>
      <ModalContent />
    </Dialog>
  );
}

function ModalContent() {
  const currentPaletteName = useThemeStore((s) => s.palette);
  return (
    <DialogContent className="lg:max-w-3xl xl:max-w-5xl">
      <DialogHeader>
        <DialogTitle>Select palette</DialogTitle>
        <DialogDescription>
          Select a palette to use for your application.
        </DialogDescription>
      </DialogHeader>
      <div className="p-1 hover-show-scroller grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-auto max-h-[calc(100vh-200px)]">
        {palettes.map((p) => (
          <PaletteItem
            key={p.name}
            palette={p}
            selected={p.name === currentPaletteName}
          />
        ))}
      </div>
    </DialogContent>
  );
}

function PaletteItem({
  palette,
  selected,
}: {
  palette: (typeof palettes)[number];
  selected: boolean;
}) {
  const isDark = useThemeStore((s) => s.isDark);
  const setPalette = useThemeStore((s) => s.setPalette);
  const setBoundingClientRect = useThemeStore((s) => s.setBoundingClientRect);
  const themeStyles = palette.cssVars[isDark ? "dark" : "light"];
  const bgColor = colorFormatter(themeStyles.primary, "hsl", "4");
  return (
    <Button
      className={cn(
        "flex w-full h-full items-center justify-start relative transition-colors duration-200 bg-primary/10",
        "px-4 py-3",
        selected ? "ring-2 ring-primary/50 shadow-md" : "",
      )}
      variant="ghost"
      style={{
        backgroundColor: bgColor
          .replace("hsl", "hsla")
          .replace(/\s+/g, ", ")
          .replace(")", ", 0.10)"),
        color: themeStyles.foreground,
      }}
      onClick={(e) => {
        e.preventDefault();
        setBoundingClientRect(e.currentTarget.getBoundingClientRect() || null);
        setPalette(palette.name);
      }}
    >
      <div className="flex items-center gap-2.5 text-center">
        <div className="flex gap-1">
          <ColorBox color={themeStyles.primary} />
          <ColorBox color={themeStyles.secondary} />
          <ColorBox color={themeStyles.accent} />
        </div>
        <span className="capitalize px-1 leading-tight">{palette.title}</span>
      </div>
    </Button>
  );
}

const ColorBox = ({ color }: { color: string }) => {
  return (
    <div
      className="w-3 h-3 border border-black/80 dark:border-white/80"
      style={{ backgroundColor: color }}
    />
  );
};

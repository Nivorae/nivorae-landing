import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/core/theme/useTheme";
import { Button } from "@/components/ui/button";
import { type Lang, i18n } from "../i18n";

interface ThemeToggleProps {
  lang: Lang;
}

export function ThemeToggle({ lang }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const t = i18n[lang].theme;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={t.label}
      className="w-8 h-8"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {resolvedTheme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

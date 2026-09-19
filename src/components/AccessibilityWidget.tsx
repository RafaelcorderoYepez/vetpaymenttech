import { useEffect, useState } from "react";
import { Accessibility, BookOpen, Contrast, Droplet, Link2, Minus, Plus, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type AccessibilityOptions = {
  grayscale: boolean;
  highContrast: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
};

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [fontScale, setFontScale] = useState(100);
  const [options, setOptions] = useState<AccessibilityOptions>({
    grayscale: false,
    highContrast: false,
    underlineLinks: false,
    readableFont: false,
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${fontScale}%`;
    root.classList.toggle("a11y-grayscale", options.grayscale);
    root.classList.toggle("a11y-high-contrast", options.highContrast);
    root.classList.toggle("a11y-underline-links", options.underlineLinks);
    root.classList.toggle("a11y-readable-font", options.readableFont);
  }, [fontScale, options]);

  function toggle(option: keyof AccessibilityOptions) {
    setOptions((current) => ({ ...current, [option]: !current[option] }));
  }

  function reset() {
    setFontScale(100);
    setOptions({ grayscale: false, highContrast: false, underlineLinks: false, readableFont: false });
  }

  return (
    <aside className="a11y-widget-ui fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-end gap-3" aria-label="Accessibility tools">
      {open && (
        <div className="w-72 max-h-[80dvh] overflow-y-auto rounded-lg border border-border bg-card p-4 text-card-foreground shadow-float">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-primary">Accessibility</h2>
            <Button variant="ghost" size="icon" className="min-h-11 min-w-11" onClick={() => setOpen(false)} aria-label="Close accessibility menu"><X /></Button>
          </div>
          <div className="grid gap-2">
            <div className="flex min-h-12 items-center justify-between rounded-md border border-border p-2">
              <span className="flex items-center gap-2 text-sm font-medium"><BookOpen size={18} /> Text size</span>
              <div className="flex items-center gap-1">
                <Button variant="secondary" size="icon" className="min-h-11 min-w-11" onClick={() => setFontScale((value) => Math.max(80, value - 10))} aria-label="Decrease text size"><Minus /></Button>
                <output className="w-11 text-center text-xs" aria-live="polite">{fontScale}%</output>
                <Button variant="secondary" size="icon" className="min-h-11 min-w-11" onClick={() => setFontScale((value) => Math.min(160, value + 10))} aria-label="Increase text size"><Plus /></Button>
              </div>
            </div>
            <OptionButton icon={<Droplet size={18} />} label="Grayscale" active={options.grayscale} onClick={() => toggle("grayscale")} />
            <OptionButton icon={<Contrast size={18} />} label="High contrast" active={options.highContrast} onClick={() => toggle("highContrast")} />
            <OptionButton icon={<Link2 size={18} />} label="Underline links" active={options.underlineLinks} onClick={() => toggle("underlineLinks")} />
            <OptionButton icon={<BookOpen size={18} />} label="Readable font" active={options.readableFont} onClick={() => toggle("readableFont")} />
            <Button variant="default" className="mt-2 min-h-11 w-full" onClick={reset}><RotateCcw /> Reset</Button>
          </div>
        </div>
      )}
      <Button variant="hero" size="icon" className="size-14 rounded-full shadow-float" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close accessibility menu" : "Open accessibility menu"} aria-expanded={open}><Accessibility className="size-6" /></Button>
    </aside>
  );
}

function OptionButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return <Button type="button" variant={active ? "secondary" : "outline"} className="min-h-12 w-full justify-between px-3" aria-pressed={active} onClick={onClick}><span className="flex items-center gap-2">{icon}{label}</span><span aria-hidden="true" className={`h-4 w-7 rounded-full p-0.5 ${active ? "bg-accent" : "bg-muted"}`}><span className={`block size-3 rounded-full bg-card transition-transform ${active ? "translate-x-3" : "translate-x-0"}`} /></span></Button>;
}
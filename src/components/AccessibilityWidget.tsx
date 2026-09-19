import { useEffect, useState } from "react";
import { Accessibility, BookOpen, Contrast, Droplet, Link2, Minus, Moon, Plus, RotateCcw, Sun, Type, X } from "lucide-react";

const STYLE_ID = "a11y-widget-styles";

type AccessibilityOptions = {
  grayscale: boolean;
  highContrast: boolean;
  negativeContrast: boolean;
  lightBackground: boolean;
  underline: boolean;
  readableFont: boolean;
};

function ensureStyleTag() {
  let element = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!element) {
    element = document.createElement("style");
    element.id = STYLE_ID;
    document.head.appendChild(element);
  }
  return element;
}

function applyStyles(options: AccessibilityOptions) {
  const rules: string[] = [];
  const filters: string[] = [];
  if (options.grayscale) filters.push("grayscale(100%)");
  if (options.negativeContrast) filters.push("invert(100%) hue-rotate(180deg)");
  if (filters.length) {
    rules.push(`html { filter: ${filters.join(" ")} !important; }`);
    rules.push("html img, html video, html picture, html iframe { filter: invert(100%) hue-rotate(180deg) !important; }");
    if (!options.negativeContrast) rules.push("html img, html video, html picture, html iframe { filter: none !important; }");
  }
  if (options.highContrast) {
    rules.push(`
      html.a11y-high-contrast, html.a11y-high-contrast body { background: #000 !important; color: #ffff00 !important; }
      html.a11y-high-contrast *:not(svg):not(path):not(.a11y-widget-ui):not(.a11y-widget-ui *) { background-color: #000 !important; color: #ffff00 !important; border-color: #ffff00 !important; }
      html.a11y-high-contrast a:not(.a11y-widget-ui):not(.a11y-widget-ui *) { color: #ffffff !important; }
      html.a11y-high-contrast img, html.a11y-high-contrast video { filter: grayscale(50%) contrast(1.1); }
      html.a11y-high-contrast .a11y-widget-ui > div { background-color: #ffffff !important; color: #0f172a !important; border-color: #cbd5e1 !important; }
      html.a11y-high-contrast .a11y-widget-ui > div * { color: #0f172a !important; border-color: #e2e8f0 !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-slate-100 { background-color: #f1f5f9 !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-slate-900 { background-color: #0f172a !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-slate-900, html.a11y-high-contrast .a11y-widget-ui .bg-slate-900 * { color: #ffffff !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-blue-50 { background-color: #eff6ff !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-blue-50, html.a11y-high-contrast .a11y-widget-ui .bg-blue-50 * { color: #1e40af !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-blue-600 { background-color: #2563eb !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-slate-300 { background-color: #cbd5e1 !important; }
      html.a11y-high-contrast .a11y-widget-ui .bg-white { background-color: #ffffff !important; }
      html.a11y-high-contrast .a11y-widget-ui > button[aria-label="Open accessibility menu"] { background-color: #2563eb !important; color: #ffffff !important; border-color: #2563eb !important; box-shadow: 0 0 0 3px #ffff00 !important; }
    `);
  }
  if (options.lightBackground) {
    rules.push(`
      html.a11y-light-bg, html.a11y-light-bg body { background: #ffffff !important; color: #111111 !important; }
      html.a11y-light-bg *:not(svg):not(path):not(img):not(video):not(.a11y-widget-ui):not(.a11y-widget-ui *) { background-color: #ffffff !important; background-image: none !important; color: #111111 !important; border-color: #d1d5db !important; }
      html.a11y-light-bg a:not(.a11y-widget-ui):not(.a11y-widget-ui *) { color: #1d4ed8 !important; }
    `);
  }
  if (options.underline) rules.push("a { text-decoration: underline !important; }");
  if (options.readableFont) rules.push(`html.a11y-readable-font, html.a11y-readable-font *:not(.a11y-widget-ui):not(.a11y-widget-ui *) { font-family: Arial, Helvetica, sans-serif !important; letter-spacing: 0.02em !important; line-height: 1.6 !important; }`);
  ensureStyleTag().textContent = rules.join("\n");
  document.documentElement.classList.toggle("a11y-high-contrast", options.highContrast);
  document.documentElement.classList.toggle("a11y-light-bg", options.lightBackground);
  document.documentElement.classList.toggle("a11y-readable-font", options.readableFont);
}

const defaultOptions: AccessibilityOptions = {
  grayscale: false,
  highContrast: false,
  negativeContrast: false,
  lightBackground: false,
  underline: false,
  readableFont: false,
};

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [fontScale, setFontScale] = useState(100);
  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;
  }, [fontScale]);

  useEffect(() => {
    applyStyles(options);
  }, [options]);

  function toggle(option: keyof AccessibilityOptions) {
    setOptions((current) => {
      const next = { ...current, [option]: !current[option] };
      if (next[option] && ["highContrast", "negativeContrast", "lightBackground"].includes(option)) {
        next.highContrast = option === "highContrast";
        next.negativeContrast = option === "negativeContrast";
        next.lightBackground = option === "lightBackground";
      }
      return next;
    });
  }

  function reset() {
    setFontScale(100);
    setOptions(defaultOptions);
    document.documentElement.style.fontSize = "";
    ensureStyleTag().textContent = "";
    document.documentElement.classList.remove("a11y-high-contrast", "a11y-light-bg", "a11y-readable-font");
  }

  return (
    <aside className="a11y-widget-ui fixed right-4 top-1/2 z-[9999] flex -translate-y-1/2 flex-col items-end gap-3" aria-label="Accessibility tools">
      {open && (
        <div className="max-h-[80vh] w-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Accessibility</h2>
            <button type="button" onClick={() => setOpen(false)} className="rounded p-1 hover:bg-slate-100" aria-label="Close accessibility menu"><X className="h-4 w-4" /></button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-2">
              <span className="flex items-center gap-2 text-sm"><Type className="h-4 w-4" /> Text size</span>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => setFontScale((value) => Math.max(80, value - 10))} className="rounded bg-slate-100 p-1 hover:bg-slate-200" aria-label="Decrease text size"><Minus className="h-3 w-3" /></button>
                <output className="w-10 text-center text-xs" aria-live="polite">{fontScale}%</output>
                <button type="button" onClick={() => setFontScale((value) => Math.min(160, value + 10))} className="rounded bg-slate-100 p-1 hover:bg-slate-200" aria-label="Increase text size"><Plus className="h-3 w-3" /></button>
              </div>
            </div>
            <ToggleRow icon={<Droplet className="h-4 w-4" />} label="Grayscale" active={options.grayscale} onClick={() => toggle("grayscale")} />
            <ToggleRow icon={<Contrast className="h-4 w-4" />} label="High contrast" active={options.highContrast} onClick={() => toggle("highContrast")} />
            <ToggleRow icon={<Moon className="h-4 w-4" />} label="Negative contrast" active={options.negativeContrast} onClick={() => toggle("negativeContrast")} />
            <ToggleRow icon={<Sun className="h-4 w-4" />} label="Light background" active={options.lightBackground} onClick={() => toggle("lightBackground")} />
            <ToggleRow icon={<Link2 className="h-4 w-4" />} label="Underline links" active={options.underline} onClick={() => toggle("underline")} />
            <ToggleRow icon={<BookOpen className="h-4 w-4" />} label="Readable font" active={options.readableFont} onClick={() => toggle("readableFont")} />
            <button type="button" onClick={reset} className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-2 text-sm text-white hover:bg-slate-800"><RotateCcw className="h-4 w-4" /> Reset</button>
          </div>
        </div>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300" aria-label="Open accessibility menu" aria-expanded={open}><Accessibility className="h-6 w-6" /></button>
    </aside>
  );
}

function ToggleRow({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`flex w-full items-center justify-between rounded-lg border p-2 text-sm transition ${active ? "border-blue-300 bg-blue-50 text-blue-800" : "border-slate-200 hover:bg-slate-50"}`} aria-pressed={active}>
      <span className="flex items-center gap-2">{icon} {label}</span>
      <span aria-hidden="true" className={`relative h-4 w-7 rounded-full ${active ? "bg-blue-600" : "bg-slate-300"}`}><span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${active ? "left-3.5" : "left-0.5"}`} /></span>
    </button>
  );
}
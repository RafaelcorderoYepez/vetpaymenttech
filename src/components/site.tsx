import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Menu, Phone, ShieldCheck, X } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import capitalLogo from "@/assets/capital-paymenttech-logo.png.asset.json";

const leadSchema = z.object({
  practice: z.string().trim().min(2, "Please enter your practice name.").max(120),
  contact: z.string().trim().min(2, "Please enter a contact person.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(24),
  volume: z.string().trim().min(1, "Please select a monthly processing range.").max(40),
});

export function BrandLockup() {
  return (
    <div className="flex min-w-0 items-center">
      <img src={capitalLogo.url} alt="Capital PaymentTech" width={1200} height={328} className="h-9 w-auto max-w-[180px] object-contain sm:h-11 lg:h-20 lg:max-w-[320px]" />
    </div>
  );
}

export function SavingsDialog({ trigger }: { trigger: ReactNode }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = leadSchema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    setSubmitted(true);
  }
  const fields = [
    ["practice", "Practice name", "Happy Paws Veterinary", "text"],
    ["contact", "Contact person", "Jordan Smith", "text"],
    ["email", "Work email", "jordan@practice.com", "email"],
    ["phone", "Phone", "(555) 555-0123", "tel"],
  ] as const;
  return (
    <Dialog onOpenChange={(open) => { if (!open) { setSubmitted(false); setErrors({}); } }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[92vh] w-[calc(100%-2rem)] overflow-y-auto border-border bg-card p-0 shadow-float sm:max-w-xl">
        {submitted ? (
          <div className="px-6 py-14 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-mint text-accent"><ShieldCheck size={34} /></span>
            <DialogTitle className="mt-6 text-3xl font-extrabold text-primary">Request received</DialogTitle>
            <DialogDescription className="mx-auto mt-3 max-w-sm text-base leading-relaxed">Thank you. Sales will contact you soon to arrange your complimentary savings analysis.</DialogDescription>
          </div>
        ) : (
          <>
            <div className="bg-primary px-6 py-7 text-primary-foreground sm:px-8">
              <DialogHeader><DialogTitle className="pr-8 text-2xl font-extrabold">Request your free savings analysis</DialogTitle><DialogDescription className="mt-2 text-primary-foreground/75">No cost, no obligation—just a clear look at what your clinic could save.</DialogDescription></DialogHeader>
            </div>
            <form onSubmit={submit} className="grid gap-5 px-6 py-7 sm:grid-cols-2 sm:px-8" noValidate>
              {fields.map(([id, label, placeholder, type]) => <div className="grid min-w-0 gap-2" key={id}><Label htmlFor={`lead-${id}`}>{label}</Label><Input id={`lead-${id}`} name={id} type={type} placeholder={placeholder} aria-invalid={Boolean(errors[id])} className="h-11" />{errors[id] && <p className="text-xs font-medium text-destructive">{errors[id]}</p>}</div>)}
              <div className="grid gap-2 sm:col-span-2"><Label htmlFor="lead-volume">Estimated monthly processing volume</Label><select id="lead-volume" name="volume" defaultValue="" className="h-11 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"><option value="" disabled>Select a range</option><option>$0–$25,000</option><option>$25,000–$50,000</option><option>$50,000–$100,000</option><option>$100,000+</option></select>{errors["volume"] && <p className="text-xs font-medium text-destructive">{errors["volume"]}</p>}</div>
              <Button type="submit" variant="hero" size="lg" className="w-full sm:col-span-2">Request my analysis <ArrowRight /></Button>
              <p className="text-center text-xs text-muted-foreground sm:col-span-2">Your information will only be used to respond to this request.</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current < 10) {
        setVisible(true);
      } else if (current > lastScrollY.current + 2) {
        setVisible(false);
      } else if (current < lastScrollY.current - 2) {
        setVisible(true);
      }
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pinned = open || visible;

  return (
    <header className={`sticky top-0 z-40 border-b border-border/70 bg-card/95 backdrop-blur-md transition-transform duration-300 ${pinned ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" aria-label="VetPaymentTech home" className="min-w-0"><BrandLockup /></Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation"><Link to="/practicepay" className="text-sm font-bold text-primary [&.active]:text-accent">Clover PracticePay</Link><SavingsDialog trigger={<Button variant="hero">Free savings analysis <ArrowRight /></Button>} /></nav>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="grid gap-1 border-t border-border bg-card px-4 py-3 md:hidden" aria-label="Mobile navigation"><Link to="/practicepay" onClick={() => setOpen(false)} className="py-2 font-bold text-primary">Clover PracticePay</Link><SavingsDialog trigger={<Button variant="hero" className="mt-2 w-full">Free savings analysis</Button>} /></nav>}
    </header>
  );
}

export function FloatingCall() {
  return <a href="tel:+15614549475" aria-label="Call Sales" className="fixed bottom-5 right-5 z-30 grid size-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-float transition-transform hover:-translate-y-1"><Phone size={25} /><span className="sr-only">Call Sales at 561-454-9475</span></a>;
}

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-9 lg:grid-cols-[1.3fr_.7fr_.7fr]">
          <div><BrandLockup /><p className="mt-5 max-w-md leading-relaxed text-primary-foreground/75">Complete payment solutions for modern veterinary practices, backed by personal local support.</p><p className="mt-5 font-script text-3xl text-accent">Partners in a Healthier Tomorrow</p></div>
          <div><h2 className="text-sm font-black uppercase text-accent">Explore</h2><div className="mt-4 grid gap-3"><Link to="/">Payment solutions</Link><Link to="/practicepay">Clover PracticePay</Link></div></div>
           <div><h2 className="text-sm font-black uppercase text-accent">Direct contact</h2><p className="mt-4 font-bold">Sales</p><a className="mt-1 block text-xl font-extrabold hover:text-accent" href="tel:+15614549475">(954) 451-6808</a><SavingsDialog trigger={<Button variant="footer" className="mt-5">Request an analysis <ArrowRight /></Button>} /></div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-primary-foreground/15 pt-6 text-xs font-semibold uppercase text-primary-foreground/60 sm:flex-row sm:justify-between"><span>© 2026 Capital PaymentTech</span><span>Pets &nbsp;|&nbsp; People &nbsp;|&nbsp; Practices &nbsp;|&nbsp; Brighter Tomorrows</span></div>
      </div>
    </footer>
  );
}
import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, BadgeCheck, CalendarCheck2, Check, CreditCard, FileCheck2, HeartHandshake, MonitorSmartphone, RefreshCcw, ShieldCheck, Smartphone, Stethoscope, Wrench } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FloatingCall, SavingsDialog, SiteFooter, SiteHeader } from "@/components/site";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import checkoutImage from "@/assets/vet-checkout-white-terminal.jpg";
import textPayImage from "@/assets/vet-text-pay.jpg";
import wellnessImage from "@/assets/vet-wellness-clover-flex.jpg";
import hardwareImage from "@/assets/vet-hardware-flex-mini.jpg";

export const Route = createFileRoute("/practicepay")({
  head: () => ({ meta: [
    { title: "Clover PracticePay for Veterinary Clinics | VetPaymentTech" },
    { name: "description", content: "Streamline veterinary payments with wellness plans, exam-room checkout, CareCredit, text-to-pay, and PIMS integrations." },
    { property: "og:title", content: "Clover PracticePay for Veterinary Clinics | VetPaymentTech" },
    { property: "og:description", content: "A unified payment workflow built for modern veterinary practices." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: PracticePayPage,
});

const workflows = [
  { image: wellnessImage, icon: CalendarCheck2, title: "Wellness plans made effortless", copy: "Automate recurring payments for preventive care memberships, vaccines, and routine visits." },
  { image: checkoutImage, icon: Stethoscope, title: "Checkout wherever care happens", copy: "Use Clover Flex in exam rooms, treatment areas, and curbside pickups without sending clients back to reception." },
  { image: textPayImage, icon: Smartphone, title: "Instant text-to-pay", copy: "Send secure payment links for deposits, outstanding balances, and remote prescription pickups." },
];

const quoteSchema = z.object({
  practice: z.string().trim().min(2, "Please enter your practice or clinic name.").max(120),
  name: z.string().trim().min(2, "Please enter your contact name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(24),
  rooms: z.string().trim().min(1, "Please enter the number of exam rooms.").max(10),
  software: z.string().trim().min(2, "Please enter your current veterinary software.").max(120),
});

const quoteFields = [
  ["practice", "Practice / Clinic Name", "Happy Paws Veterinary", "text"],
  ["name", "Contact Name", "Jordan Smith", "text"],
  ["email", "Email", "jordan@practice.com", "email"],
  ["phone", "Phone", "(555) 555-0123", "tel"],
  ["rooms", "Number of Exam / Treatment Rooms", "e.g. 6", "text"],
  ["software", "Current Veterinary Software (PIMS/EHR)", "e.g. Cornerstone, AVImark", "text"],
] as const;

const trustBadges = [
  { icon: BadgeCheck, label: "Authorized Clover Local Partner" },
  { icon: ShieldCheck, label: "Secure Payment Processing" },
  { icon: Wrench, label: "Installation, Training & Support" },
];

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = quoteSchema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return <div className="rounded-lg border border-border bg-card px-6 py-14 text-center shadow-card sm:px-10"><span className="mx-auto grid size-16 place-items-center rounded-full bg-mint text-accent"><ShieldCheck size={34} /></span><h3 className="mt-6 text-3xl font-extrabold text-primary">Request received</h3><p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-muted-foreground">Thank you. Our local Clover team will contact you to schedule your personalized veterinary demo and offer.</p></div>;
  }

  return <form onSubmit={submit} noValidate className="grid grid-cols-1 gap-5 overflow-hidden rounded-lg border border-border bg-card p-4 shadow-card sm:grid-cols-2 sm:p-8">
    {quoteFields.map(([id, label, placeholder, type]) => <div className="grid min-w-0 gap-2" key={id}><Label htmlFor={`quote-${id}`}>{label}</Label><Input id={`quote-${id}`} name={id} type={type} placeholder={placeholder} aria-invalid={Boolean(errors[id])} aria-describedby={errors[id] ? `quote-${id}-error` : undefined} className="h-11 w-full min-w-0" />{errors[id] && <p id={`quote-${id}-error`} className="text-xs font-medium text-destructive">{errors[id]}</p>}</div>)}
    <Button type="submit" size="lg" variant="hero" className="mt-1 w-full px-5 sm:col-span-2 sm:px-8">Get Your Custom Veterinary Offer &amp; Demo <ArrowRight /></Button>
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:col-span-2 sm:gap-x-6">{trustBadges.map(({ icon: Icon, label }) => <span key={label} className="inline-flex items-center gap-2 text-xs font-bold uppercase text-navy-soft"><Icon size={16} className="text-accent" /> {label}</span>)}</div>
  </form>;
}

function PracticePayPage() {
  return <main className="min-h-screen bg-background"><SiteHeader />
    <section className="bg-surface-soft py-16 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl text-center"><span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-mint px-4 py-2 text-xs font-bold uppercase text-accent"><HeartHandshake size={16} /> Built around veterinary care</span><h1 className="mt-6 text-4xl font-black uppercase leading-tight text-primary sm:text-6xl">Every payment workflow. <span className="text-accent">One connected platform.</span></h1><p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-navy-soft sm:text-xl">Clover PracticePay helps your team collect confidently—from wellness plans and routine exams to unexpected surgeries.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><SavingsDialog trigger={<Button variant="hero" size="lg">Request a PracticePay consultation <ArrowRight /></Button>} /><Button asChild variant="outline" size="lg"><a href="#hardware"><MonitorSmartphone /> Explore hardware</a></Button></div></div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">{workflows.map(({image,icon:Icon,title,copy}) => <article key={title} className="group overflow-hidden rounded-lg border border-border bg-card shadow-card"><div className="aspect-[3/2] overflow-hidden"><img src={image} alt="Veterinary payment workflow" width={1200} height={800} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div><div className="p-6"><span className="grid size-12 place-items-center rounded-full bg-mint text-accent"><Icon size={25} /></span><h2 className="mt-5 text-xl font-extrabold text-primary">{title}</h2><p className="mt-2 leading-relaxed text-muted-foreground">{copy}</p></div></article>)}</div></div></section>

    <section className="bg-card py-16 sm:py-20"><div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"><div><p className="font-script text-3xl text-accent">Clarity in difficult moments</p><h2 className="mt-2 text-3xl font-black uppercase text-primary sm:text-4xl">More ways to pay for the care pets need</h2><p className="mt-5 text-lg leading-relaxed text-navy-soft">Help families move forward with treatment through CareCredit®, flexible payment options, secure card-on-file, and clear digital estimates.</p><ul className="mt-7 grid gap-4">{["CareCredit® acceptance alongside major cards and mobile wallets","Recurring plans for preventive care and chronic-condition visits","Deposits and balances collected before or after appointments","Secure transaction records with simpler reconciliation"].map(item => <li key={item} className="flex gap-3"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mint text-accent"><Check size={15}/></span><span className="font-medium text-navy-soft">{item}</span></li>)}</ul></div><div className="rounded-lg bg-primary p-7 text-primary-foreground shadow-float sm:p-10"><div className="flex items-center justify-between border-b border-primary-foreground/20 pb-5"><div><p className="text-xs font-bold uppercase text-primary-foreground/60">Treatment estimate</p><p className="mt-1 text-xl font-extrabold">Emergency procedure</p></div><CreditCard className="text-accent" size={36}/></div><dl className="mt-6 grid gap-4"><div className="flex justify-between"><dt>Procedure total</dt><dd className="font-bold">$2,400</dd></div><div className="flex justify-between"><dt>Deposit today</dt><dd className="font-bold">$600</dd></div><div className="flex justify-between rounded-md bg-primary-foreground/10 p-4"><dt className="font-bold">Flexible options</dt><dd className="font-black text-accent">Available</dd></div></dl><p className="mt-6 flex gap-3 text-sm text-primary-foreground/75"><FileCheck2 className="shrink-0 text-accent" size={20}/>Clear options help teams focus on care while families make informed decisions.</p></div></div></section>

    <section id="hardware" className="bg-surface-soft py-16 sm:py-20"><div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8"><div className="overflow-hidden rounded-lg shadow-card"><img src={hardwareImage} alt="Clover Flex and Clover Mini payment terminals in a veterinary clinic" width={1024} height={768} loading="lazy" className="h-full w-full object-cover"/></div><div><p className="font-script text-3xl text-accent">Complimentary equipment</p><h2 className="mt-2 text-3xl font-black uppercase text-primary sm:text-4xl">Clover Flex &amp; Mini at no upfront cost</h2><p className="mt-5 text-lg leading-relaxed text-navy-soft">Equip your mobile care team with reliable hardware designed for fast, familiar checkout.</p><div className="mt-7 grid gap-4">{["Portable checkout in exam rooms and curbside","Flexible workflows for reception teams","Staff training and guided implementation","Personal support from a dedicated account manager"].map(item => <p key={item} className="flex gap-3 font-semibold text-primary"><Check className="shrink-0 text-accent"/> {item}</p>)}</div></div></div></section>

    <section className="bg-primary py-16 text-primary-foreground"><div className="mx-auto max-w-6xl px-4 text-center sm:px-6"><RefreshCcw className="mx-auto text-accent" size={42}/><h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black uppercase sm:text-5xl">Seamless PIMS & EHR synchronization</h2><p className="mx-auto mt-5 max-w-3xl text-lg text-primary-foreground/75">Connect payment activity with leading veterinary systems to reduce double entry and keep client accounts current.</p><div className="mt-8 flex flex-wrap justify-center gap-3">{["Cornerstone","AVImark","eVetPractice","Covetrus","and more"].map(name => <span key={name} className="rounded-full border border-primary-foreground/25 px-4 py-2 text-sm font-bold">{name}</span>)}</div></div></section>
    <section id="quote-form" aria-labelledby="quote-heading" className="bg-card py-16 sm:py-20"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><div className="mb-10 text-center"><h2 id="quote-heading" className="text-3xl font-black uppercase text-primary sm:text-4xl">Upgrade Payment Processing for Your <span className="text-accent">Veterinary Practice</span></h2><p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-navy-soft">Talk to our local Clover authorized support team for a personalized offer, equipment setup, software integration, and staff training.</p></div><QuoteForm /></div></section>
    <SiteFooter/><FloatingCall/>
  </main>;
}
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BarChart3, CalendarClock, ChartNoAxesCombined, CreditCard, FileChartColumn, Gauge, Headset, HeartHandshake, Link2, PawPrint, Phone, Presentation, ShieldCheck, Smartphone, UsersRound, WalletCards, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingCall, SavingsDialog, SiteFooter, SiteHeader } from "@/components/site";
import heroImage from "@/assets/vet-hero.jpg";
import checkoutImage from "@/assets/vet-checkout.jpg";
import hardwareImage from "@/assets/vet-hardware.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Veterinary Payment Solutions | VetPaymentTech" },
    { name: "description", content: "Lower processing costs and offer modern payment options with veterinary payment solutions from Capital PaymentTech and Clover PracticePay." },
    { property: "og:title", content: "A Healthier Way to Get Paid | VetPaymentTech" },
    { property: "og:description", content: "Complete payment solutions for modern veterinary practices." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: Index,
});

const features = [
  { icon: ShieldCheck, title: "Surcharge Program", copy: "Pass credit card fees legally and easily" },
  { icon: CreditCard, title: "Low Debit Rates", copy: "Keep costs low on debit transactions" },
  { icon: Zap, title: "Next-Day Funding", copy: "Improve your clinic's cash flow" },
  { icon: HeartHandshake, title: "CareCredit® & Options", copy: "Give pet owners more ways to pay" },
  { icon: Smartphone, title: "Payment Links", copy: "Collect anytime with text-to-pay" },
];
const benefits = [
  { icon: CalendarClock, title: "Recurring Payments", copy: "Wellness plans, preventive memberships, and routine care" },
  { icon: WalletCards, title: "Card-on-File", copy: "Secure and convenient for repeat visits and curbside pickup" },
  { icon: Link2, title: "Balance Recovery Tools", copy: "Collect outstanding client balances effortlessly" },
  { icon: UsersRound, title: "Dedicated Account Manager", copy: "Personal support, not a call center" },
  { icon: Headset, title: "Chargeback Assistance", copy: "Direct advocacy when disputes happen" },
  { icon: Presentation, title: "Staff Training Included", copy: "A smooth, fast implementation" },
  { icon: FileChartColumn, title: "Quarterly Statement Review", copy: "Always know you are getting the best rates" },
  { icon: BarChart3, title: "Annual Savings Report", copy: "See exactly how much your clinic has saved" },
];

function SavingsCalculator() {
  const [volume, setVolume] = useState(50000);
  const [rate, setRate] = useState(3.2);
  const targetRate = 2.35;
  const monthly = Math.max(0, volume * (rate - targetRate) / 100);
  return <section className="bg-primary py-16 text-primary-foreground sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8"><div><p className="font-script text-3xl text-accent">Know your numbers</p><h2 className="mt-2 text-3xl font-black uppercase sm:text-4xl">Estimate what your practice could save</h2><p className="mt-5 text-lg leading-relaxed text-primary-foreground/75">Adjust the monthly card volume and your current effective rate for an instant estimate.</p></div><div className="rounded-lg bg-card p-6 text-foreground shadow-float sm:p-8"><div className="grid gap-7 sm:grid-cols-2"><label className="grid gap-2 font-bold text-primary">Monthly card volume<input aria-label="Monthly card volume" type="range" min="10000" max="250000" step="5000" value={volume} onChange={(e)=>setVolume(Number(e.target.value))} className="accent-accent"/><span className="text-2xl font-black text-accent">${volume.toLocaleString()}</span></label><label className="grid gap-2 font-bold text-primary">Current effective rate<input aria-label="Current effective rate" type="range" min="2.4" max="4.5" step="0.05" value={rate} onChange={(e)=>setRate(Number(e.target.value))} className="accent-accent"/><span className="text-2xl font-black text-accent">{rate.toFixed(2)}%</span></label></div><div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-7"><div><p className="text-xs font-bold uppercase text-muted-foreground">Estimated monthly savings</p><p className="mt-1 text-3xl font-black text-primary">${Math.round(monthly).toLocaleString()}</p></div><div><p className="text-xs font-bold uppercase text-muted-foreground">Estimated annual savings</p><p className="mt-1 text-3xl font-black text-accent">${Math.round(monthly*12).toLocaleString()}</p></div></div><p className="mt-5 text-xs text-muted-foreground">Illustrative estimate based on a 2.35% comparison rate. Actual rates and savings vary after statement review.</p><SavingsDialog trigger={<Button variant="hero" className="mt-6 w-full">Get my exact savings analysis <ArrowRight/></Button>} /></div></div></section>;
}

function Index() {
  return <main className="min-h-screen overflow-hidden bg-background"><SiteHeader />
    <section className="relative isolate min-h-[650px] overflow-hidden"><img src={heroImage} alt="Veterinarian with a golden retriever and cat in a modern clinic" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover object-[68%_center]"/><div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_97%,transparent)_43%,color-mix(in_oklab,var(--background)_30%,transparent)_72%,transparent_100%)]"/><div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8"><div className="rise-in max-w-3xl"><span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-mint px-3 py-1.5 text-xs font-bold uppercase text-accent sm:text-sm"><PawPrint size={16}/> Purpose-built for veterinary practices</span><h1 className="mt-6 max-w-3xl text-5xl font-black uppercase leading-[.96] text-primary sm:text-6xl lg:text-7xl">A healthier way to <span className="text-accent">get paid</span></h1><p className="mt-6 max-w-xl text-xl font-medium text-foreground sm:text-2xl">Complete payment solutions for modern veterinary practices</p><div className="my-6 h-1 w-20 rounded-full bg-accent"/><p className="max-w-xl text-lg leading-relaxed text-navy-soft sm:text-xl">Lower processing costs. More payment options for pet owners. A stronger, more profitable practice.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><SavingsDialog trigger={<Button variant="hero" size="lg">See how much you could save <ArrowRight/></Button>} /><Button asChild variant="outline" size="lg"><a href="tel:+15614549475"><Phone/> Call Patrick</a></Button></div></div><div className="rise-in rise-in-delay mt-auto flex justify-end pb-5 lg:pb-10"><div className="max-w-md rounded-lg border border-accent/20 bg-mint/95 p-5 shadow-float backdrop-blur-sm"><div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4"><span className="grid size-16 place-items-center rounded-full bg-accent text-accent-foreground"><PawPrint size={34}/></span><div><p className="text-2xl font-black uppercase leading-none text-accent">Veterinary savings guarantee</p><p className="mt-2 text-sm font-medium text-navy-soft">See how much your practice could save.</p></div></div></div></div></div></section>

    <section className="bg-card py-14"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-2 gap-4 lg:grid-cols-5">{features.map(({icon:Icon,title,copy}) => <article key={title} className="min-w-0 rounded-lg border border-border bg-card p-5 text-center shadow-card transition-transform hover:-translate-y-1 last:col-span-2 last:mx-auto last:w-full last:max-w-[300px] lg:last:col-span-1"><span className="mx-auto grid size-16 place-items-center rounded-full bg-mint text-accent"><Icon size={31}/></span><h2 className="mt-4 text-lg font-extrabold leading-tight text-primary">{title}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p></article>)}</div></div></section>

    <section className="bg-surface-soft py-16 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.35fr_.65fr] lg:px-8"><div><div className="mb-9 flex items-center gap-4"><h2 className="text-2xl font-black uppercase text-accent sm:text-3xl">Additional benefits for your practice</h2><span className="hidden h-0.5 flex-1 bg-accent/60 sm:block"/></div><div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">{benefits.map(({icon:Icon,title,copy}) => <article key={title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4"><span className="grid size-12 place-items-center rounded-md border border-border bg-card text-primary shadow-card"><Icon size={25}/></span><div><h3 className="font-extrabold text-primary">{title}</h3><p className="mt-1 leading-snug text-muted-foreground">{copy}</p></div></article>)}</div></div><aside className="overflow-hidden rounded-lg bg-card shadow-card"><img src={hardwareImage} alt="Payment terminals for veterinary practices" width={1200} height={912} loading="lazy" className="aspect-[4/3] w-full object-cover"/><div className="p-7"><h2 className="text-3xl font-black text-primary">Complimentary Equipment</h2><p className="mt-3 text-lg text-navy-soft">Clover Flex and Clover Mini at no upfront cost.</p><Link to="/practicepay" className="mt-5 inline-flex items-center gap-2 font-bold text-accent">Explore PracticePay <ArrowRight size={18}/></Link></div></aside></div></section>

    <section className="bg-mint py-10"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">{[{icon:ChartNoAxesCombined,title:"More revenue",copy:"Keep more of what you earn"},{icon:UsersRound,title:"Happier pet owners",copy:"Flexible, modern options"},{icon:Gauge,title:"A more efficient clinic",copy:"Simple, integrated solutions"},{icon:BarChart3,title:"A stronger practice",copy:"Built for growth"}].map(({icon:Icon,title,copy})=><div key={title} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4"><Icon className="text-accent" size={40}/><div><h3 className="text-sm font-black uppercase text-primary">{title}</h3><p className="mt-1 text-sm text-navy-soft">{copy}</p></div></div>)}</div></section>
    <SavingsCalculator/>
    <section className="bg-card py-16 sm:py-20"><div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"><div className="overflow-hidden rounded-lg shadow-card"><img src={checkoutImage} alt="Veterinarian helping a pet owner with mobile checkout" width={1200} height={800} loading="lazy" className="w-full object-cover"/></div><div><p className="font-script text-3xl text-accent">Care comes first</p><h2 className="mt-2 text-3xl font-black uppercase text-primary sm:text-4xl">Payments that move with your team</h2><p className="mt-5 text-lg leading-relaxed text-navy-soft">From the exam room to curbside pickup, PracticePay gives your staff flexible ways to collect while keeping the client experience personal.</p><Button asChild variant="hero" size="lg" className="mt-7"><Link to="/practicepay">See veterinary workflows <ArrowRight/></Link></Button></div></div></section>
    <SiteFooter/><FloatingCall/>
  </main>;
}
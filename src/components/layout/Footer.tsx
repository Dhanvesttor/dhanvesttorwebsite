import Link from "next/link";
import Image from "next/image";
import { footerNav } from "@/content/nav";
import { site } from "@/content/site";
import { disclaimers } from "@/content/disclaimers";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Image src="/brand/wordmark.png" alt="Dhanvesttor" width={1600} height={150} className="h-4 w-auto brightness-0 invert opacity-90" />
            <p className="mt-6 font-display text-[1.75rem] font-light italic leading-tight text-terracotta">Her Money, Her Growth</p>
            <p className="mt-5 max-w-[42ch] text-[14.5px] text-ivory/70">A SEBI-registered portfolio manager in Kolkata. Personal portfolios, curated mutual funds, and a community that teaches the language of money.</p>
            <div className="mt-8">
              <p className="eyebrow text-marigold mb-3">Monthly letter</p>
              <NewsletterForm dark />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <p className="eyebrow text-marigold mb-4">{col.heading}</p>
                <ul className="grid gap-2.5">
                  {col.links.map(([label, href]) => (
                    <li key={href}><Link href={href} className="text-[14px] text-ivory/80 transition-colors hover:text-ivory">{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-ivory/10 pt-10 md:grid-cols-3">
          <div className="text-[13.5px] text-ivory/70">
            <p className="font-medium text-ivory">{site.legalName}, operating as {site.name}</p>
            <p className="mt-2">{site.address.line1}, {site.address.line2}, {site.address.city} {site.address.pin}</p>
            <p className="mt-2"><a href={site.phoneHref} className="hover:text-ivory">{site.phone}</a> · <a href={`mailto:${site.email}`} className="hover:text-ivory">{site.email}</a></p>
            <p className="mt-2">{site.hours.join(" · ")}</p>
          </div>
          <div className="text-[13.5px] text-ivory/70">
            <p className="font-medium text-ivory">Regulatory</p>
            <p className="mt-2">SEBI Registered Portfolio Manager, Reg. No. {site.sebiReg}. LLPIN {site.llpin}.</p>
            <p className="mt-2">Compliance Officer: Neha Verma · <Link href="/regulatory/grievance" className="underline underline-offset-4 hover:text-ivory">Grievance redressal</Link> · <a href="https://scores.sebi.gov.in" target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-ivory">SEBI SCORES</a> · <a href="https://smartodr.in" target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-ivory">SMART ODR</a></p>
          </div>
          <div className="text-[13.5px] text-ivory/70">
            <p className="font-medium text-ivory">Logins</p>
            <p className="mt-2"><a href={site.loginUrl} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-ivory">Investor login</a> · <a href={site.pmsLoginUrl} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-ivory">PMS login (Kotak)</a></p>
            <p className="mt-4 flex gap-4">
              {Object.entries(site.socials).map(([k, v]) => <a key={k} href={v} target="_blank" rel="noopener" className="capitalize hover:text-ivory">{k === "x" ? "X" : k}</a>)}
            </p>
          </div>
        </div>
        <p className="mt-10 max-w-[120ch] text-[12px] leading-relaxed text-ivory/50">{disclaimers.general} {disclaimers.mutualFunds}</p>
        <p className="mt-6 text-[12px] text-ivory/50">© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
      </Container>
    </footer>
  );
}

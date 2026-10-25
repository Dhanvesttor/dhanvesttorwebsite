import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = buildMetadata({ title: "Investor Login", description: "Log in to your Dhanvesttor investor portal for mutual funds and consolidated holdings, or to the Kotak PMS portal for portfolio management.", path: "/login" });

export default function Login() {
  return (
    <Shell>
      <PageHero compact crumbs={[{ name: "Login", path: "/login" }]} eyebrow="Investor login" title={<>Your portfolio, <em>any time.</em></>} lede="Two portals, depending on what you hold with us." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <a href={site.loginUrl} target="_blank" rel="noopener" className="group rounded-2xl bg-indigo p-8 text-ivory transition-transform hover:-translate-y-1">
            <p className="eyebrow text-marigold">Mutual funds & consolidated view</p><h2 className="mt-4 text-[2.2rem]">Investor login <span aria-hidden>↗</span></h2>
            <p className="mt-3 text-ivory/80">SIPs, holdings, transactions and statements across all your mutual funds.</p>
          </a>
          <a href={site.pmsLoginUrl} target="_blank" rel="noopener" className="group rounded-2xl border border-line bg-white p-8 transition-transform hover:-translate-y-1">
            <p className="eyebrow">Portfolio management</p><h2 className="mt-4 text-[2.2rem]">PMS login <span aria-hidden>↗</span></h2>
            <p className="mt-3 text-[#3f3d5c]">Your PMS holdings and statements, through our custodian Kotak Mahindra Bank.</p>
          </a>
        </div>
        <p className="mt-8 max-w-[70ch] text-[14px] text-mist">Trouble logging in? Call {site.phone} or write to {site.email}. Dhanvesttor will never ask for your password or an OTP by phone, email or WhatsApp.</p>
      </Section>
    </Shell>
  );
}

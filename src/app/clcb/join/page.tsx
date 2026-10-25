import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { ClcbJoinForm } from "@/components/forms/ClcbJoinForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Join CLCB: Free Money Community for Women", description: "Join Dhanvesttor's CLCB community for free financial literacy sessions, learning circles and masterclasses. No sales pitch.", path: "/clcb/join" });

export default function Join() {
  return (
    <Shell>
      <PageHero compact tone="sand" crumbs={[{ name: "CLCB", path: "/clcb" }, { name: "Join", path: "/clcb/join" }]} eyebrow="Join the community" title={<>Free. No pitch. <em>Just the language of money.</em></>} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="text-[1.0625rem] text-[#3f3d5c]">
            <h2 className="text-[2rem] text-ink">What happens next</h2>
            <ol className="mt-6 grid gap-5">
              <li><span className="font-display text-terracotta">01</span> We add you to the community list for your city.</li>
              <li><span className="font-display text-terracotta">02</span> You hear about the next session that suits where you are, by WhatsApp or email.</li>
              <li><span className="font-display text-terracotta">03</span> You come, ask anything, and leave with one specific action.</li>
            </ol>
            <p className="mt-8 text-[14px] text-mist">We never share your details and we will not call you about products unless you ask us to.</p>
          </div>
          <ClcbJoinForm />
        </div>
      </Section>
    </Shell>
  );
}

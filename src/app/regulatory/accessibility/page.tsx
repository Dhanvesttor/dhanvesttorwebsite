import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = buildMetadata({ title: "Accessibility Statement", description: "Dhanvesttor's commitment to an accessible website: WCAG 2.1 AA, keyboard navigation, reduced motion and how to report a barrier.", path: "/regulatory/accessibility" });

export default function Accessibility() {
  return (
    <LegalPage title="Accessibility" path="/regulatory/accessibility" lede="Understanding money should not depend on how you use the web." updated="October 2026">
      <p>We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA across this website.</p>
      <h2>What we have done</h2>
      <ul><li>Every page can be navigated by keyboard, with a visible focus indicator and a skip-to-content link.</li><li>Text and backgrounds meet contrast requirements.</li><li>Animations are disabled if your device is set to reduce motion.</li><li>Calculators work with keyboard and screen readers; results are announced as they change.</li><li>Images carry descriptive alternative text; decorative images are hidden from assistive technology.</li></ul>
      <h2>Report a barrier</h2>
      <p>If something on this site is hard to use, please tell us at {site.email} or {site.phone}. We will respond within five working days and, where we can, provide the information another way.</p>
    </LegalPage>
  );
}

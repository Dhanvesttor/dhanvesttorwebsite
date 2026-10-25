import { Section } from "@/components/ui/Section";
import { Hairline } from "@/components/ui/Hairline";
import { EnquiryForm, type EnquiryPath } from "@/components/forms/EnquiryForm";
import { site } from "@/content/site";

/** The closing section of most pages: a short invitation and the enquiry form. */
export function ContactBand({
  heading = <>Start a <em>conversation.</em></>, lede = "Tell us a little about yourself. A person, not a bot, replies within one working day.", paths = ["pms", "mf", "clcb"], defaultPath, tone = "indigo",
}: { heading?: React.ReactNode; lede?: string; paths?: EnquiryPath[]; defaultPath?: EnquiryPath; tone?: "indigo" | "sand" }) {
  const light = tone === "indigo";
  return (
    <Section tone={tone} id="contact">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <Hairline className="mb-6" />
          <p className={light ? "eyebrow text-marigold mb-3" : "eyebrow mb-3"}>Get in touch</p>
          <h2 className={light ? "text-[2.25rem] sm:text-[2.75rem] [&_em]:text-marigold" : "text-[2.25rem] sm:text-[2.75rem]"}>{heading}</h2>
          <p className={light ? "mt-5 max-w-[46ch] text-ivory/80" : "mt-5 max-w-[46ch] text-[#3f3d5c]"}>{lede}</p>
          <dl className={light ? "mt-10 grid gap-5 text-[14.5px] text-ivory/80" : "mt-10 grid gap-5 text-[14.5px] text-[#3f3d5c]"}>
            <div><dt className={light ? "eyebrow text-marigold" : "eyebrow"}>Call</dt><dd className="mt-1"><a href={site.phoneHref} className="hover:underline">{site.phone}</a> · <a href={site.whatsapp} target="_blank" rel="noopener" className="hover:underline">WhatsApp</a></dd></div>
            <div><dt className={light ? "eyebrow text-marigold" : "eyebrow"}>Write</dt><dd className="mt-1"><a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a></dd></div>
            <div><dt className={light ? "eyebrow text-marigold" : "eyebrow"}>Visit</dt><dd className="mt-1">{site.address.line1}, {site.address.line2}, {site.address.city} {site.address.pin}<br />{site.hours.join(" · ")}</dd></div>
          </dl>
        </div>
        <EnquiryForm paths={paths} defaultPath={defaultPath} light={light} />
      </div>
    </Section>
  );
}

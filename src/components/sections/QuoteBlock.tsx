import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
export function QuoteBlock({ quote, name, role, image, imageSrc, light }: { quote: string; name: string; role: string; image?: string; imageSrc?: string; light?: boolean }) {
  return (
    <figure className="grid items-center gap-10 md:grid-cols-[.8fr_1.4fr] md:gap-16">
      {image && <ImagePlaceholder label={image} src={imageSrc} alt={name} ratio="4/5" />}
      <div>
        <blockquote className={light ? "font-display text-[1.75rem] font-light leading-snug sm:text-[2.25rem] [&_em]:text-marigold" : "font-display text-[1.75rem] font-light leading-snug text-ink sm:text-[2.25rem]"}>“{quote}”</blockquote>
        <figcaption className={light ? "mt-6 text-[14px] text-ivory/70" : "mt-6 text-[14px] text-mist"}><span className="font-medium text-current">{name}</span> · {role}</figcaption>
      </div>
    </figure>
  );
}

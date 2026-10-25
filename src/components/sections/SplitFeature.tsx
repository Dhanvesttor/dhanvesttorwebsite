import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Hairline } from "@/components/ui/Hairline";
import { cn } from "@/lib/utils";

/** Text beside an image. `flip` puts the image first. Children render under the lede (lists, buttons). */
export function SplitFeature({
  eyebrow, title, lede, image, imageSrc, imageAlt, flip, children, light, ratio = "4/5",
}: { eyebrow?: string; title: React.ReactNode; lede?: React.ReactNode; image: string; imageSrc?: string; imageAlt?: string; flip?: boolean; children?: React.ReactNode; light?: boolean; ratio?: "4/5" | "3/4" | "1/1" | "3/2" }) {
  return (
    <div className={cn("grid items-center gap-10 lg:grid-cols-2 lg:gap-16")}>
      <div className={cn(flip && "lg:order-2")}>
        <Hairline className="mb-6" />
        {eyebrow && <p className={cn("eyebrow mb-3", light && "text-marigold")}>{eyebrow}</p>}
        <h2 className="text-[2.1rem] sm:text-[2.6rem]">{title}</h2>
        {lede && <div className={cn("mt-5 max-w-[52ch] text-[1.0625rem] sm:text-lg", light ? "text-ivory/80" : "text-[#3f3d5c]")}>{lede}</div>}
        {children && <div className="mt-7">{children}</div>}
      </div>
      <ImagePlaceholder label={image} src={imageSrc} alt={imageAlt} ratio={ratio} className={cn(flip && "lg:order-1")} />
    </div>
  );
}

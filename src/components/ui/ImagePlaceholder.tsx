import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A sand matte with the one-rounded-corner motif. Pass `src` to show a real image;
 * leave it out and the label describes the photograph that will go here.
 */
export function ImagePlaceholder({
  label, ratio = "4/5", className, src, alt = "", priority, sizes = "(min-width: 1024px) 50vw, 100vw",
}: { label: string; ratio?: "4/5" | "3/4" | "1/1" | "16/9" | "3/2" | "21/9"; className?: string; src?: string; alt?: string; priority?: boolean; sizes?: string }) {
  const r = { "4/5": "aspect-[4/5]", "3/4": "aspect-[3/4]", "1/1": "aspect-square", "16/9": "aspect-video", "3/2": "aspect-[3/2]", "21/9": "aspect-[21/9]" }[ratio];
  return (
    <div className={cn("matte relative bg-sand", r, className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(160deg,#EFE3CF,#D9C7AB)]">
          <div className="absolute right-4 top-4 h-10 w-10 rounded-[4px_20px_4px_4px] bg-marigold/70" />
          <div className="absolute left-4 bottom-4 right-4 rounded-md bg-ink/60 px-3 py-2 text-[11px] uppercase tracking-[.12em] text-ivory backdrop-blur-sm">Photo · {label}</div>
        </div>
      )}
    </div>
  );
}

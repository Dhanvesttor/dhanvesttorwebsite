import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Full lockup on desktop, mark + wordmark on small screens. Logo files are the client's originals. */
export function Logo({ className, variant = "full", priority }: { className?: string; variant?: "full" | "compact" | "mark"; priority?: boolean }) {
  return (
    <Link href="/" aria-label="Dhanvesttor home" className={cn("inline-flex items-center gap-2.5", className)}>
      {variant === "full" && <Image src="/brand/logo.png" alt="Dhanvesttor — Her Money, Her Growth" width={1600} height={873} priority={priority} className="h-14 w-auto sm:h-16" />}
      {variant === "compact" && (
        <>
          <Image src="/brand/mark.png" alt="" width={560} height={510} priority={priority} className="h-8 w-auto" />
          <Image src="/brand/wordmark.png" alt="Dhanvesttor" width={1600} height={150} priority={priority} className="h-[14px] w-auto" />
        </>
      )}
      {variant === "mark" && <Image src="/brand/mark.png" alt="Dhanvesttor" width={560} height={510} className="h-9 w-auto" />}
    </Link>
  );
}

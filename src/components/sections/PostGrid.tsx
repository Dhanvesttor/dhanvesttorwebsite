import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/cms/types";

export function PostGrid({ posts, featured }: { posts: Post[]; featured?: boolean }) {
  if (!posts.length) return <p className="text-mist">No articles yet.</p>;
  const [first, ...rest] = posts;
  return (
    <div className="grid gap-10">
      {featured && first && (
        <Link href={`/insights/${first.slug}`} className="group grid gap-8 rounded-2xl border border-line bg-white p-5 md:grid-cols-2 md:p-6">
          <ImagePlaceholder label={first.coverAlt ?? first.title} src={first.cover} alt={first.coverAlt ?? ""} ratio="3/2" />
          <div className="flex flex-col justify-center">
            <p className="eyebrow">{first.category.name} · {first.readingMinutes} min</p>
            <h3 className="mt-3 text-[1.9rem] leading-tight group-hover:text-indigo sm:text-[2.25rem]">{first.title}</h3>
            <p className="mt-4 text-[1rem] text-[#3f3d5c]">{first.excerpt}</p>
            <p className="mt-5 text-[13px] text-mist">{first.author.name} · {formatDate(first.date)}</p>
          </div>
        </Link>
      )}
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {(featured ? rest : posts).map((p) => (
          <li key={p.slug}>
            <Link href={`/insights/${p.slug}`} className="group block">
              <ImagePlaceholder label={p.coverAlt ?? p.title} src={p.cover} alt={p.coverAlt ?? ""} ratio="3/2" />
              <p className="eyebrow mt-5">{p.category.name} · {p.readingMinutes} min</p>
              <h3 className="mt-2 text-[1.4rem] leading-tight group-hover:text-indigo">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-[14.5px] text-[#3f3d5c]">{p.excerpt}</p>
              <p className="mt-3 text-[12.5px] text-mist">{formatDate(p.date)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

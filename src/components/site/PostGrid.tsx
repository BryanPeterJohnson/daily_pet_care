import { PostCard } from "@/components/PostCard";
import type { PostCard as P } from "@/lib/types";

export function PostGrid({ posts }: { posts: P[] }) {
  return (
    <div className="grid gap-5 xs:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-5 lg:gap-7 2xl:grid-cols-4">
      {posts.map((p, i) => <PostCard key={p.id} post={p} priority={i < 3} />)}
    </div>
  );
}

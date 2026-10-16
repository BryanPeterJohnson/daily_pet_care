export declare const categories: { name: string; slug: string; description: string; sort: number }[];
export declare const posts: {
  title: string; slug: string; category: string; featured: boolean; status?: "DRAFT" | "PUBLISHED";
  daysAgo: number; tags: string[]; excerpt: string; content: string; metaTitle?: string; metaDescription?: string;
}[];

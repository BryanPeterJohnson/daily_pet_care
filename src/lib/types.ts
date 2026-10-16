export type Role = "ADMIN" | "EDITOR" | "AUTHOR";
export type PostStatus = "DRAFT" | "PENDING" | "PUBLISHED";

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatar: string | null;
  slug: string;
}

export interface PostCard {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  cover_alt: string | null;
  published_at: Date;
  reading_time: number;
  views: number;
  featured: number;
  category_name: string | null;
  category_slug: string | null;
  author_name: string;
  author_slug: string;
  author_avatar: string | null;
}

export interface PostFull extends PostCard {
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  updated_at: Date;
  category_id: number | null;
  author_id: number;
  author_bio: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sort_order: number;
  post_count?: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

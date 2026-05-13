export type Post = {
  id: number;
  title: string;
  slug: string;
  category: {
    id: number;
    name: string;
    slug?: string;
  } | null;
  excerpt: string;
  coverImage: string;
  date: string;
  featured: boolean;
  content?: string;
};

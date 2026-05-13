import type { Post } from "../types/post";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

export const getStrapiMediaUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
};

export const mapPost = (item: any): Post => {
  const attrs = item.attributes ?? item;
  const category = attrs.category?.data?.attributes ?? attrs.category;
  const coverImage =
    attrs.coverImage?.data?.attributes ?? attrs.coverImage?.formats?.large ?? attrs.coverImage;

  return {
    id: item.id,
    title: attrs.title ?? "",
    slug: attrs.slug ?? "",
    excerpt: attrs.excerpt ?? "",
    content: attrs.content ?? "",
    date: attrs.publishedAtCustom || attrs.publishedAt || attrs.createdAt || "",
    coverImage: getStrapiMediaUrl(coverImage?.url),
    featured: attrs.featured ?? false,
    category: category
      ? {
          id: attrs.category?.data?.id ?? category.id,
          name: category.name ?? "",
          slug: category.slug,
        }
      : null,
  };
};

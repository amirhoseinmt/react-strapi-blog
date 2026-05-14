import type { Post } from "../types/post";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

type StrapiRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is StrapiRecord =>
  typeof value === "object" && value !== null;

const asRecord = (value: unknown): StrapiRecord => (isRecord(value) ? value : {});

const asString = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : fallback;

const asBoolean = (value: unknown, fallback = false) =>
  typeof value === "boolean" ? value : fallback;

export const getStrapiMediaUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
};

export const mapPost = (item: unknown): Post => {
  const itemRecord = asRecord(item);
  const attrs = asRecord(itemRecord.attributes ?? itemRecord);
  const categoryRelation = asRecord(attrs.category);
  const categoryData = asRecord(categoryRelation.data);
  const category = asRecord(categoryData.attributes ?? attrs.category);
  const coverRelation = asRecord(attrs.coverImage);
  const coverData = asRecord(coverRelation.data);
  const coverFormats = asRecord(coverRelation.formats);
  const coverLarge = asRecord(coverFormats.large);
  const coverImage = asRecord(coverData.attributes ?? coverLarge ?? attrs.coverImage);

  return {
    id: typeof itemRecord.id === "number" ? itemRecord.id : 0,
    title: asString(attrs.title),
    slug: asString(attrs.slug),
    excerpt: asString(attrs.excerpt),
    content: asString(attrs.content),
    date: asString(attrs.publishedAtCustom || attrs.publishedAt || attrs.createdAt),
    coverImage: getStrapiMediaUrl(asString(coverImage.url)),
    featured: asBoolean(attrs.featured),
    category: Object.keys(category).length
      ? {
          id: typeof categoryData.id === "number" ? categoryData.id : Number(category.id) || 0,
          name: asString(category.name),
          slug: asString(category.slug) || undefined,
        }
      : null,
  };
};

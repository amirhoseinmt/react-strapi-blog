import type { Post } from "../types/post";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

// Ensures a value is an object. Prevents crashes if API returns null or invalid types. //
const asObject = (value: unknown): Record<string, any> =>
  typeof value === "object" && value !== null ? value : {};

// Safely converts a value to string. Returns fallback if value is not a string. //
const asString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

// Safely converts value to boolean. //
const asBoolean = (value: unknown, fallback = false): boolean =>
  typeof value === "boolean" ? value : fallback;

// Converts relative Strapi media URLs to absolute URLs. Example: /uploads/image.jpg → http://localhost:1337/uploads/image.jpg //
export const getStrapiMediaUrl = (url?: string | null): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
};

const extractRelation = (relation: unknown) => {
  const relObj = asObject(relation);
  const data = asObject(relObj.data);
  return asObject(data.attributes ?? relation);
};

const extractMediaUrl = (media: unknown): string => {
  const mediaObj = asObject(media);

  const data = asObject(mediaObj.data);
  const attrs = asObject(data.attributes);

  if (attrs.url) {
    return getStrapiMediaUrl(asString(attrs.url));
  }

  const formats = asObject(mediaObj.formats);
  const large = asObject(formats.large);

  if (large.url) {
    return getStrapiMediaUrl(asString(large.url));
  }

  return "";
};

export const mapPost = (item: unknown): Post => {
  const obj = asObject(item);
  const attrs = asObject(obj.attributes ?? obj);
  const category = extractRelation(attrs.category);

  return {
    id: typeof obj.id === "number" ? obj.id : 0,
    title: asString(attrs.title),
    slug: asString(attrs.slug),
    excerpt: asString(attrs.excerpt),
    content: asString(attrs.content),
    date: asString(
      attrs.publishedAtCustom || attrs.publishedAt || attrs.createdAt,
    ),
    coverImage: extractMediaUrl(attrs.coverImage),
    featured: asBoolean(attrs.featured),
    category: category.name
      ? {
          id:
            typeof category.id === "number"
              ? category.id
              : Number(category.id) || 0,
          name: asString(category.name),
          slug: asString(category.slug) || undefined,
        }
      : null,
  };
};

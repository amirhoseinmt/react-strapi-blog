import client from "./client";
import { mapPost } from "../lib/strapiMappers";
import type { Post } from "../types/post";

export const getPosts = async (): Promise<Post[]> => {
  const res = await client.get("/api/posts?populate=*");
  return (res.data?.data ?? []).map(mapPost);
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const res = await client.get("/api/posts", {
    params: {
      "filters[slug][$eq]": slug,
      populate: "*",
    },
  });

  const post = res.data?.data?.[0];
  return post ? mapPost(post) : null;
};

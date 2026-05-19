import client from "./client";
import { mapPost } from "../lib/strapiMappers";
import type { Post } from "../types/post";

// post response type - strapi response (we just need data) -> { "data": [ ... ], "meta": { ... }}
type PostsResponse = {
  data?: unknown[];
};

// for cancelling request - signal is part of AbortController Web API
type RequestOptions = {
  signal?: AbortSignal;
};

// api raw data -> array of post | function parameter is strapi data (PostResponse) or undefined, null, missing
const mapPostsResponse = (data: PostsResponse | undefined): Post[] => {
  return (data?.data ?? []).map(mapPost);
};

// get all posts
export const getPosts = async (
  options: RequestOptions = {},
): Promise<Post[]> => {
  const res = await client.get<PostsResponse>("/api/posts", {
    params: {
      populate: "*",
    },
    signal: options.signal,
  });
  return mapPostsResponse(res.data);
};

// get latest posts with limited number
export const getLatestPosts = async (
  limit: number,
  options: RequestOptions = {},
): Promise<Post[]> => {
  const res = await client.get<PostsResponse>("/api/posts", {
    params: {
      populate: "*",
      "sort[0]": "publishedAt:desc",
      "pagination[pageSize]": limit,
    },
    signal: options.signal,
  });
  return mapPostsResponse(res.data);
};

// for post detail page
export const getPostBySlug = async (
  slug: string,
  options: RequestOptions = {},
): Promise<Post | null> => {
  const res = await client.get<PostsResponse>("/api/posts", {
    params: {
      "filters[slug][$eq]": slug,
      populate: "*",
    },
    signal: options.signal,
  });
  const post = res.data?.data?.[0];
  return post ? mapPost(post) : null;
};

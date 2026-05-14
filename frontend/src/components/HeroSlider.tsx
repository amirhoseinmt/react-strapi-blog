import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { AxiosError } from "axios";
import client from "../api/client";
import { mapPost } from "../lib/strapiMappers";
import type { Post } from "../types/post";

type HeroSliderProps = {
  maxSlides: number;
};

type PostsResponse = {
  data?: unknown[];
};

const SLIDE_INTERVAL = 5000;

const fetchPosts = async (
  params: Record<string, string | number | boolean>,
  signal: AbortSignal,
) => {
  const res = await client.get<PostsResponse>("/api/posts", {
    params: {
      populate: "*",
      ...params,
    },
    signal,
  });

  return (res.data?.data ?? []).map(mapPost);
};

const mergeFeaturedWithLatest = (
  featured: Post[],
  latest: Post[],
  maxSlides: number,
) => {
  const uniquePosts = new Map<number, Post>();

  for (const post of featured) {
    if (uniquePosts.size >= maxSlides) break;
    uniquePosts.set(post.id, post);
  }

  for (const post of latest) {
    if (uniquePosts.size >= maxSlides) break;
    if (!uniquePosts.has(post.id)) uniquePosts.set(post.id, post);
  }

  return Array.from(uniquePosts.values());
};

const HeroSlider = ({ maxSlides }: HeroSliderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const safeMaxSlides = useMemo(
    () => Math.max(1, Math.floor(maxSlides)),
    [maxSlides],
  );

  useEffect(() => {
    const controller = new AbortController();

    const loadSlides = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const featuredPosts = await fetchPosts(
          {
            "filters[featured][$eq]": true,
            "sort[0]": "publishedAt:desc",
            "pagination[pageSize]": safeMaxSlides,
          },
          controller.signal,
        );

        let latestPosts: Post[] = [];
        if (featuredPosts.length < safeMaxSlides) {
          latestPosts = await fetchPosts(
            {
              "sort[0]": "publishedAt:desc",
              "pagination[pageSize]": safeMaxSlides + featuredPosts.length,
            },
            controller.signal,
          );
        }

        setPosts(
          mergeFeaturedWithLatest(featuredPosts, latestPosts, safeMaxSlides),
        );
        setCurrent(0);
      } catch (err) {
        if ((err as AxiosError).code === "ERR_CANCELED") return;
        console.error("Error fetching hero slider posts:", err);
        setError("امکان دریافت اسلایدها وجود ندارد.");
        setPosts([]);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadSlides();

    return () => controller.abort();
  }, [safeMaxSlides]);

  useEffect(() => {
    if (posts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [posts.length]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
  };

  if (isLoading) {
    return (
      <div className="flex h-105 w-full items-center justify-center rounded-2xl bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
        در حال دریافت اسلایدها...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-105 w-full items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 text-center text-red-600 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="relative h-105 w-full overflow-hidden rounded-2xl bg-zinc-950">
      {posts.map((post, index) => (
        <Link
          key={post.id}
          to={`/posts/${post.slug}`}
          aria-hidden={index !== current}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-5000 ease-out hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-zinc-800 via-zinc-700 to-zinc-950" />
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 text-white sm:p-8 lg:max-w-3xl">
            {post.category?.name && (
              <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                {post.category.name}
              </span>
            )}
            <h2 className="text-2xl font-black leading-tight sm:text-4xl">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="line-clamp-2 max-w-2xl text-sm leading-6 text-zinc-100 sm:text-base">
                {post.excerpt}
              </p>
            )}
          </div>
        </Link>
      ))}

      {posts.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-xl text-zinc-950 shadow-lg transition hover:bg-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-xl text-zinc-950 shadow-lg transition hover:bg-white"
          >
            ›
          </button>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {posts.map((post, index) => (
              <button
                key={post.id}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  current === index
                    ? "w-9 bg-white"
                    : "w-2.5 bg-white/45 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSlider;

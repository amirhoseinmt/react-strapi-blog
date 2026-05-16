import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { AxiosError } from "axios";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import client from "../api/client";
import { mapPost } from "../lib/strapiMappers";
import type { Post } from "../types/post";

type HeroSliderProps = {
  maxSlides: number;
};

type PostsResponse = {
  data?: unknown[];
};

const fetchLatestPosts = async (limit: number, signal: AbortSignal) => {
  const res = await client.get<PostsResponse>("/api/posts", {
    params: {
      populate: "*",
      "sort[0]": "publishedAt:desc",
      "pagination[pageSize]": limit,
    },
    signal,
  });

  return (res.data?.data ?? []).map(mapPost);
};

const HeroSlider = ({ maxSlides }: HeroSliderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
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

        const latestPosts = await fetchLatestPosts(
          safeMaxSlides,
          controller.signal,
        );

        setPosts(latestPosts);
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

  if (isLoading) {
    return (
      <div className="flex h-105 w-full items-center justify-center rounded-3xl bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
        در حال دریافت اسلایدها...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-105 w-full items-center justify-center rounded-3xl border border-red-200 bg-red-50 px-6 text-center text-red-600 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden rounded-3xl bg-zinc-950 shadow-2xl shadow-zinc-950/20">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop={posts.length > 1}
        navigation={posts.length > 1}
        pagination={posts.length > 1 ? { clickable: true } : false}
        autoplay={
          posts.length > 1
            ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }
            : false
        }
        className="hero-slider h-105 w-full"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <Link to={`/posts/${post.slug}`} className="group relative block h-full">
              {post.coverImage ? (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-linear-to-br from-zinc-800 via-teal-900 to-zinc-950" />
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-10">
                <div className="max-w-3xl space-y-3">
                  {post.category?.name && (
                    <span className="inline-flex rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-md">
                      {post.category.name}
                    </span>
                  )}
                  <h2 className="text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="line-clamp-2 max-w-2xl text-sm leading-6 text-zinc-100 sm:text-base">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;

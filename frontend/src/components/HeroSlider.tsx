import { useEffect, useState } from "react";
import type { Post } from "../types/post";
import { Link } from "react-router-dom";

type HeroSliderProps = {
  posts: Post[];
};

const SLIDE_INTERVAL = 5000;

const HeroSlider = ({ posts }: HeroSliderProps) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (posts.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev: number) => (prev === posts.length - 1 ? 0 : prev + 1));
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [posts.length]);

  return (
    <div className="relative w-full h-105 overflow-hidden rounded-2xl">
      {posts.map((post: Post, index: number) => (
        <Link
          key={post.id}
          to={`/posts/${post.slug}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

          <h2 className="absolute bottom-6 right-6 text-white text-3xl font-bold max-w-md">
            {post.title}
          </h2>
        </Link>
      ))}

      <div className="absolute bottom-6 left-6 flex gap-3">
        {posts.map((_: Post, index: number) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-10 rounded-full transition-all ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;

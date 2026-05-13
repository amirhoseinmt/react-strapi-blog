import { useEffect, useState } from "react";
import { getPosts } from "../../api/posts";
import PostCard from "../../components/PostCard";
import HeroSlider from "../../components/HeroSlider";
import type { Post } from "../../types/post";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setPosts(await getPosts());
      } catch (err) {
        console.error("Error fetching homepage posts:", err);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const editorPicks = posts.filter((post) => post.featured).slice(0, 3);

  // Latest posts published
  const latestPosts = posts.slice(0, 8);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-zinc-500">
        در حال دریافت پست‌ها...
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Hero Slider */}
      {editorPicks.length > 0 && (
        <section>
          <HeroSlider posts={editorPicks} />
        </section>
      )}

      {/* Latest Posts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">آخرین پست‌ها</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* More Button */}
        <div className="flex justify-center">
          <a
            href="/posts"
            className="px-6 py-3 text-sm font-medium bg-zinc-900 text-white rounded-lg dark:bg-zinc-100 dark:text-black transition hover:opacity-90"
          >
            نمایش بیشتر
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

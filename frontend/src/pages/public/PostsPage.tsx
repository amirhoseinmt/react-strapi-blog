import { useEffect, useState } from "react";
import { getPosts } from "../../api/posts";
import PostCard from "../../components/PostCard";
import type { Post } from "../../types/post";

type SortOrder = "newest" | "oldest";

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setPosts(await getPosts());
        setError(null);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("خطا در دریافت پست‌ها از سرور");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredPosts = posts.filter((post) => {
    const searchableText = [
      post.title,
      post.category?.name ?? "",
      post.excerpt,
      post.content ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const firstDate = new Date(a.date).getTime();
    const secondDate = new Date(b.date).getTime();

    return sortOrder === "newest"
      ? secondDate - firstDate
      : firstDate - secondDate;
  });

  const perPage = 12;
  const start = (page - 1) * perPage;
  const paginatedPosts = sortedPosts.slice(start, start + perPage);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / perPage));

  if (isLoading) {
    return (
      <div className="py-20 text-center text-zinc-500">
        در حال دریافت پست‌ها...
      </div>
    );
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder="جستجو در پست‌ها..."
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 outline-none transition focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900 sm:w-80"
          />

          {normalizedQuery && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {filteredPosts.length} نتیجه برای «{searchQuery.trim()}»
            </p>
          )}
        </div>

        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value as SortOrder);
            setPage(1);
          }}
          className="rounded-lg border border-zinc-300 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="newest">جدیدترین‌ها</option>
          <option value="oldest">قدیمی‌ترین‌ها</option>
        </select>
      </div>

      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {paginatedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          پستی پیدا نشد.
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((currentPage) => currentPage - 1)}
            className="rounded bg-zinc-100 px-4 py-2 transition hover:bg-zinc-200 disabled:opacity-30 dark:bg-zinc-800"
          >
            قبلی
          </button>

          <span className="text-sm font-medium">
            {page} از {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((currentPage) => currentPage + 1)}
            className="rounded bg-zinc-100 px-4 py-2 transition hover:bg-zinc-200 disabled:opacity-30 dark:bg-zinc-800"
          >
            بعدی
          </button>
        </div>
      )}
    </div>
  );
};

export default PostsPage;

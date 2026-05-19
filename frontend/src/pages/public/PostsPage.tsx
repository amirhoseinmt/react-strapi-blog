import { useEffect, useMemo, useState } from "react";
import { getPosts } from "../../api/posts";
import PostCard from "../../components/PostCard";
import type { Post } from "../../types/post";

type SortOrder = "newest" | "oldest";

// ??
type CategoryFilter = NonNullable<Post["category"]>;

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  // fetching all posts
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

  // category extraction ??
  const categories = useMemo(() => {
    const uniqueCategories = new Map<number, CategoryFilter>();

    for (const post of posts) {
      if (post.category) uniqueCategories.set(post.category.id, post.category);
    }

    return Array.from(uniqueCategories.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [posts]);

  // for normalize serach input texts (React, REACT, react)
  const normalizedQuery = searchQuery.trim().toLowerCase();

  // filtering the posts
  const filteredPosts = useMemo(() => {
    const selectedCategorySet = new Set(selectedCategoryIds);

    return posts.filter((post) => {
      const matchesCategory =
        selectedCategorySet.size === 0 ||
        (post.category ? selectedCategorySet.has(post.category.id) : false);

      if (!matchesCategory) return false;

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
  }, [normalizedQuery, posts, selectedCategoryIds]);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      const firstDate = new Date(a.date).getTime();
      const secondDate = new Date(b.date).getTime();

      return sortOrder === "newest"
        ? secondDate - firstDate
        : firstDate - secondDate;
    });
  }, [filteredPosts, sortOrder]);

  const toggleCategory = (categoryId: number) => {
    setSelectedCategoryIds((currentIds) =>
      currentIds.includes(categoryId)
        ? currentIds.filter((id) => id !== categoryId)
        : [...currentIds, categoryId],
    );
    setPage(1);
  };

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
      <div className="space-y-5">
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

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = selectedCategoryIds.includes(category.id);

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-blue-300 hover:text-blue-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        )}
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

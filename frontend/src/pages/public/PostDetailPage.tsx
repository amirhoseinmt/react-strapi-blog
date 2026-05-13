import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostBySlug } from "../../api/posts";
import type { Post } from "../../types/post";

const PostDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setPost(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getPostBySlug(slug);
        setPost(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("خطا در دریافت مقاله از سرور");
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl text-center text-zinc-500 dark:text-zinc-400">
          در حال دریافت مقاله...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl text-center text-red-500">
          {error}
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
            مقاله پیدا نشد
          </h1>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            پستی با این آدرس وجود ندارد یا حذف شده است.
          </p>

          <Link
            to="/posts"
            className="inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700"
          >
            بازگشت به مقالات
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-10">
      <article className="mx-auto max-w-4xl">
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="mb-8 h-75 w-full rounded-2xl object-cover md:h-112.5"
          />
        )}

        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
          {post.category?.name && (
            <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {post.category.name}
            </span>
          )}

          {post.date && (
            <span className="text-zinc-500 dark:text-zinc-400">
              {new Date(post.date).toLocaleDateString("fa-IR")}
            </span>
          )}
        </div>

        <h1 className="mb-6 text-3xl font-extrabold leading-tight text-zinc-900 md:text-4xl dark:text-white">
          {post.title}
        </h1>

        <p className="mb-8 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          {post.excerpt}
        </p>

        <div className="whitespace-pre-line text-base leading-8 text-zinc-700 dark:text-zinc-300">
          {post.content}
        </div>

        <div className="mt-10">
          <Link
            to="/posts"
            className="inline-flex rounded-lg border border-zinc-300 px-5 py-2.5 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            بازگشت به لیست مقالات
          </Link>
        </div>
      </article>
    </section>
  );
};

export default PostDetailPage;

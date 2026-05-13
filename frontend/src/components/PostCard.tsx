import { Link } from "react-router-dom";
import type { Post } from "../types/post";

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link
      to={`/posts/${post.slug}`}
      className="group block overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <img
        src={post.coverImage}
        alt={post.title}
        className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
      />

      <div className="space-y-2 p-4">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {post.category?.name}
        </span>

        <h3 className="line-clamp-2 text-lg font-bold leading-tight">
          {post.title}
        </h3>

        <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;

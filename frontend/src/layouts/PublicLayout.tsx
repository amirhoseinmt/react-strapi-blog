import { Outlet, Link, NavLink } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import LocalClock from "../components/LocalClock";

const PublicLayout = () => {
  return (
    <div
      className="min-h-screen flex flex-col 
                    bg-zinc-100 text-zinc-900
                    dark:bg-zinc-950 dark:text-zinc-100
                    transition-colors duration-300"
    >
      {/* Navbar */}
      <header
        className="border-b 
                         border-zinc-200 bg-white/80
                         dark:border-zinc-800 dark:bg-zinc-900/80
                         backdrop-blur sticky top-0 z-50"
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between py-4">
          <Link to="/" className="font-bold text-xl tracking-tight">
            BarelyCoder
          </Link>

          <div className="flex items-center gap-6">
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-800 dark:text-gray-500"
                  : "text-gray-500 dark:text-gray-600"
              }
            >
              Posts
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-800 dark:text-gray-500"
                  : "text-gray-500 dark:text-gray-600"
              }
            >
              Login
            </NavLink>

            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto py-6 flex items-center justify-between text-sm opacity-60">
          <p>© {new Date().getFullYear()} BarelyCoder</p>
          <LocalClock />
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

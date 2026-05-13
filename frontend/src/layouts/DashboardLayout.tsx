import { Outlet, NavLink, Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const DashboardLayout = () => {
  return (
    <div
      className="min-h-screen flex 
                    bg-zinc-100 text-zinc-900
                    dark:bg-zinc-950 dark:text-zinc-100
                    transition-colors duration-300"
    >
      {/* Sidebar */}
      <aside
        className="w-64 p-5 border-r 
                        border-zinc-200 bg-white
                        dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h2 className="font-bold text-lg mb-6">Dashboard</h2>

        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard">Overview</NavLink>
          <NavLink to="/dashboard/posts">My Posts</NavLink>
        </nav>

        <div className="mt-auto pt-6">
          <Link to="/" className="text-sm opacity-70">
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header
          className="h-16 flex items-center justify-between px-6 
                           border-b border-zinc-200 bg-white
                           dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h1 className="font-semibold">User Panel</h1>
          <ThemeToggle />
        </header>

        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

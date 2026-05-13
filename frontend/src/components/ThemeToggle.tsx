import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="px-3 py-1 rounded-md border 
                 bg-zinc-800 text-white border-zinc-700
                 dark:bg-zinc-700 dark:border-zinc-600
                 transition"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;

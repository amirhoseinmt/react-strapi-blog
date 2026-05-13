const posts = [
  {
    id: 1,
    title: "React Server Components چیست و چرا مهم است؟",
    category: "React",
    excerpt:
      "در این مقاله با مفهوم کامپوننت‌های سروری React و نحوه‌ی استفاده‌ی آن‌ها برای بهبود عملکرد آشنا می‌شویم...",
    image: "/src/assets/posts/pic1.jpg",
    date: "2024-05-01",
    content:
      "توسعه فرانت‌اند در سال‌های اخیر با سرعت بسیار بالایی تغییر کرده است. ابزارهایی مثل Vite، TypeScript و معماری component-based نقش مهمی در افزایش سرعت توسعه و maintainability پروژه‌ها داشته‌اند. در این مقاله نگاهی به روندهای اصلی این حوزه داریم.",
  },
  {
    id: 2,
    title: "راهنمای کامل TailwindCSS v4 و تغییرات جدید آن",
    category: "CSS",
    excerpt:
      "Tailwind نسخه جدید خود را معرفی کرده و با کامپایلر Lightning سرعت بی‌نظیری را ارائه داده است...",
    image: "/src/assets/posts/pic2.jpg",
    date: "2024-05-02",
    content:
      "توسعه فرانت‌اند در سال‌های اخیر با سرعت بسیار بالایی تغییر کرده است. ابزارهایی مثل Vite، TypeScript و معماری component-based نقش مهمی در افزایش سرعت توسعه و maintainability پروژه‌ها داشته‌اند. در این مقاله نگاهی به روندهای اصلی این حوزه داریم.",
  },
  {
    id: 3,
    title: "ترفندهای حرفه‌ای طراحی UI با Framer Motion",
    category: "Animation",
    excerpt:
      "کتابخانه Framer Motion ابزار قدرتمندی برای ساخت انیمیشن‌های چشم‌نواز در React است. در این مقاله برخی ترفندها را مرور می‌کنیم...",
    image: "/src/assets/posts/pic3.jpg",
    date: "2024-05-03",
    content:
      "توسعه فرانت‌اند در سال‌های اخیر با سرعت بسیار بالایی تغییر کرده است. ابزارهایی مثل Vite، TypeScript و معماری component-based نقش مهمی در افزایش سرعت توسعه و maintainability پروژه‌ها داشته‌اند. در این مقاله نگاهی به روندهای اصلی این حوزه داریم.",
  },
  {
    id: 4,
    title: "Next.js 15 چطور عملکرد برنامه‌ها را چند برابر کرده؟",
    category: "Next.js",
    excerpt:
      "در نسخه جدید Next.js قابلیت‌های React Server Actions و ساختار جدید فایل‌بندی معرفی شده است...",
    image: "/src/assets/posts/pic3.jpg",
    date: "2024-05-04",
    content:
      "توسعه فرانت‌اند در سال‌های اخیر با سرعت بسیار بالایی تغییر کرده است. ابزارهایی مثل Vite، TypeScript و معماری component-based نقش مهمی در افزایش سرعت توسعه و maintainability پروژه‌ها داشته‌اند. در این مقاله نگاهی به روندهای اصلی این حوزه داریم.",
  },
  {
    id: 5,
    title: "مدیریت حالت تم با Zustand به‌صورت کاملاً بهینه",
    category: "State Management",
    excerpt:
      "در این آموزش یاد می‌گیریم چطور یک کنترل تم سبک و سریع با Zustand بسازیم و از prop drilling خلاص شویم...",
    image: "/src/assets/posts/pic1.jpg",
    date: "2024-05-05",
    content:
      "توسعه فرانت‌اند در سال‌های اخیر با سرعت بسیار بالایی تغییر کرده است. ابزارهایی مثل Vite، TypeScript و معماری component-based نقش مهمی در افزایش سرعت توسعه و maintainability پروژه‌ها داشته‌اند. در این مقاله نگاهی به روندهای اصلی این حوزه داریم.",
  },
  {
    id: 6,
    title: "راه‌اندازی پروژه React با Vite در کمتر از یک دقیقه",
    category: "Tooling",
    excerpt:
      "Vite یکی از سریع‌ترین ابزارهای ساخت پروژه‌های مدرن جاوااسکریپت است. در این مقاله مراحل شروع را مرور می‌کنیم...",
    image: "/src/assets/posts/pic2.jpg",
    date: "2024-05-06",
  },
  {
    id: 7,
    title: "بهترین روش‌های SEO برای وب‌اپ‌های React و Next.js",
    category: "SEO",
    excerpt:
      "در این مقاله چند تکنیک برای بهبود SEO صفحات SPA و SSR را با مثال بررسی می‌کنیم...",
    image: "/src/assets/posts/pic3.jpg",
    date: "2024-05-07",
  },
  {
    id: 8,
    title: "ساخت کامپوننت Button پیشرفته با Tailwind و Variants",
    category: "UI",
    excerpt:
      "در بخش طراحی کامپوننت‌ها، ساخت دکمه قابل تنظیم و ری‌یوزبل با پشتیبانی از حالت‌های مختلف اهمیت زیادی دارد...",
    image: "/src/assets/posts/pic2.jpg",
    date: "2024-05-08",
  },
  {
    id: 9,
    title: "مدیریت فرم‌ها در React با React Hook Form",
    category: "React",
    excerpt:
      "React Hook Form یکی از سریع‌ترین و منعطف‌ترین کتابخانه‌ها برای کنترل فرم‌ها در React است...",
    image: "/src/assets/posts/pic1.jpg",
    date: "2024-05-09",
  },
  {
    id: 10,
    title: "آشنایی با React Query و مزایای آن در مدیریت دیتا",
    category: "Data Fetching",
    excerpt:
      "React Query کار را برای همگام‌سازی و کش‌کردن داده‌ها در کلاینت فوق‌العاده راحت کرده است...",
    image: "/src/assets/posts/pic2.jpg",
    date: "2024-05-10",
  },
  {
    id: 11,
    title: "ساخت Layout داینامیک برای صفحات Dashboard",
    category: "Layout",
    excerpt:
      "در پروژه‌های بزرگ طراحی رابط کاربری باید Layoutهای داینامیک و ری‌یوزبل برای سایدبار و کانتنت داشته باشیم...",
    image: "/src/assets/posts/pic3.jpg",
    date: "2024-05-11",
  },
  {
    id: 12,
    title: "۵ الگوی معماری مؤثر در پروژه‌های Frontend",
    category: "Architecture",
    excerpt:
      "در این مطلب مروری داریم بر معماری‌های معمول در پروژه‌های مدرن فرانت‌اند مثل Atomic Design و Feature-based...",
    image: "/src/assets/posts/pic2.jpg",
    date: "2024-05-12",
  },
  {
    id: 13,
    title: "آشنایی با PWA و ساخت اپ آفلاین با React",
    category: "Performance",
    excerpt:
      "Progressive Web Application ابزاری است برای ساخت تجربه‌ای نزدیک به اپ موبایل در مرورگر...",
    image: "/src/assets/posts/pic3.jpg",
    date: "2024-05-13",
  },
  {
    id: 14,
    title: "ساخت حالت Skeleton Loader با Tailwind و React",
    category: "Loading State",
    excerpt:
      "وقتی داده‌ها در حال بارگذاری هستند، Skeletonها باعث حس روان‌تر و UX بهتر می‌شوند...",
    image: "/src/assets/posts/pic1.jpg",
    date: "2024-05-14",
  },
  {
    id: 15,
    title: "بهینه‌سازی عملکرد کامپوننت‌ها در React",
    category: "Optimization",
    excerpt:
      "اگر برنامه‌ات کند شده یا رندرهای زیادی دارد، در این مقاله راهکارهای memo، React.memo و useCallback را یاد می‌گیریم...",
    image: "/src/assets/posts/pic2.jpg",
    date: "2024-05-15",
  },
  {
    id: 16,
    title: "ساخت Typography سیستم در Tailwind",
    category: "Design System",
    excerpt:
      "در این قسمت یاد می‌گیریم چطور تایپوگرافی یکدست برای پروژه طراحی کنیم، با Utility کلاس‌ها و Custom Variantها...",
    image: "/src/assets/posts/pic3.jpg",
    date: "2024-05-16",
  },
];

export default posts;

import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 text-center">
      <p
        className="text-[10rem] font-black leading-none tracking-tighter text-foreground/10 select-none"
        aria-hidden="true"
      >
        404
      </p>

      <h1 className="text-3xl font-bold mt-[-1rem] mb-4">找不到這個頁面</h1>
      <p className="text-muted-foreground text-lg mb-10 max-w-sm">您要找的頁面不存在或已被移除。</p>

      <Link
        to="/"
        className="px-8 py-3 bg-foreground text-background font-semibold rounded-full hover:opacity-80 transition-opacity"
      >
        回到首頁
      </Link>
    </div>
  );
}

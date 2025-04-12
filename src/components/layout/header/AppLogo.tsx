
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <Link to="/" className="flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl">MangaVerse</span>
      </Link>
    </div>
  );
}

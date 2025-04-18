
import { Link } from "react-router-dom";
import { ChevronRight, Crown, Award, Medal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { popularManga } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function RankingSection() {
  // Get top 3 manga by rating
  const topManga = [...popularManga]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const rankingIcons = [
    <Crown className="h-5 w-5 text-[#FFD700]" />, // Gold
    <Award className="h-5 w-5 text-[#C0C0C0]" />, // Silver
    <Medal className="h-5 w-5 text-[#CD7F32]" />  // Bronze
  ];

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Top Ranked</h2>
        <Link 
          to="/ranking" 
          className="flex items-center text-sm text-primary hover:underline"
        >
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topManga.map((manga, index) => (
          <Link 
            key={manga.id} 
            to={`/manga/${manga.id}`}
            className="block transition-transform hover:scale-[1.02]"
          >
            <Card className={cn(
              "h-full overflow-hidden hover:bg-accent/5 transition-colors",
              index === 0 && "ring-2 ring-[#FFD700]/20"
            )}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative flex-shrink-0">
                    <img 
                      src={manga.coverImage} 
                      alt={manga.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div className="absolute -top-2 -left-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm">
                      {rankingIcons[index]}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium line-clamp-2">{manga.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {manga.author}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-sm text-primary">
                        ★ {manga.rating.toFixed(1)}
                      </span>
                      {index === 0 && (
                        <span className="text-xs bg-accent/50 px-2 py-0.5 rounded-full">
                          #1 Overall
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

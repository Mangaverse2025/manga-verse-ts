
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { trendingManga } from "@/data/mockData";

// Mock notification data
const notifications = trendingManga.slice(0, 5).map((manga) => ({
  id: `notification-${manga.id}`,
  mangaId: manga.id,
  mangaTitle: manga.title,
  coverImage: manga.coverImage,
  chapterName: `Chapter ${Math.floor(Math.random() * 100) + 1}`,
  timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
}));

export function NotificationPanel() {
  const [notifs, setNotifs] = useState(notifications);

  return (
    <div className="py-2">
      <div className="flex items-center justify-between px-4 py-2">
        <h3 className="font-medium text-lg flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </h3>
        <Button variant="ghost" size="sm">
          Mark all as read
        </Button>
      </div>
      
      <Separator className="my-1" />
      
      <div className="max-h-80 overflow-y-auto">
        {notifs.length > 0 ? (
          notifs.map((notification) => (
            <Link 
              key={notification.id}
              to={`/manga/${notification.mangaId}`}
              className="block px-4 py-3 hover:bg-accent transition-colors"
            >
              <div className="flex gap-3">
                <img 
                  src={notification.coverImage}
                  alt={notification.mangaTitle}
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium line-clamp-1">{notification.mangaTitle}</h4>
                  <p className="text-sm text-muted-foreground">{notification.chapterName}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No new notifications
          </div>
        )}
      </div>
      
      <Separator className="my-1" />
      
      <div className="px-4 py-2">
        <Button variant="ghost" size="sm" className="w-full justify-between" asChild>
          <Link to="/notifications">
            View all notifications
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

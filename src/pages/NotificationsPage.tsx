
import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CheckCircle2, Book, Clock } from "lucide-react";
import { trendingManga, popularManga } from "@/data/mockData";

// Create mock notification data
const createMockNotifications = (count: number, type: string) => {
  const mangas = [...trendingManga, ...popularManga];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `notification-${type}-${i}`,
    mangaId: mangas[i % mangas.length].id,
    mangaTitle: mangas[i % mangas.length].title,
    coverImage: mangas[i % mangas.length].coverImage,
    chapterName: `Chapter ${Math.floor(Math.random() * 100) + 1}`,
    message: type === 'update' 
      ? `New chapter released` 
      : type === 'system' 
        ? `MangaVerse has been updated`
        : `Your bookmark has been updated`,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
    type: type,
    read: i < 3 ? false : true
  }));
};

const NotificationsPage = () => {
  // Mock notification data
  const initialNotifications = [
    ...createMockNotifications(10, 'update'),
    ...createMockNotifications(5, 'system'),
    ...createMockNotifications(7, 'bookmark')
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<string>("all");
  
  // Filter notifications based on selected tab
  const filteredNotifications = filter === "all" 
    ? notifications 
    : filter === "unread"
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === filter);
  
  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground">
          Stay updated with the latest manga releases and system announcements
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all" className="flex gap-2">
              <Bell className="h-4 w-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Unread
            </TabsTrigger>
            <TabsTrigger value="update" className="flex gap-2">
              <Book className="h-4 w-4" />
              Updates
            </TabsTrigger>
            <TabsTrigger value="system" className="flex gap-2">
              <Clock className="h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button variant="outline" onClick={markAllAsRead}>Mark all as read</Button>
      </div>
      
      <TabsContent value="all" className="mt-0">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`border border-border rounded-lg p-4 transition-colors ${
                  notification.read ? 'bg-card/30' : 'bg-card'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  <Link to={`/manga/${notification.mangaId}`}>
                    <img 
                      src={notification.coverImage}
                      alt={notification.mangaTitle}
                      className="w-16 h-24 object-cover rounded"
                    />
                  </Link>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <Link 
                        to={`/manga/${notification.mangaId}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {notification.mangaTitle}
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-sm mt-1">
                      {notification.message} - {notification.chapterName}
                    </p>
                    
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        asChild
                      >
                        <Link to={`/manga/${notification.mangaId}`}>View Details</Link>
                      </Button>
                      
                      {!notification.read && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg">No notifications</p>
            <p className="text-muted-foreground">
              You don't have any notifications at the moment
            </p>
          </div>
        )}
      </TabsContent>
    </MainLayout>
  );
};

export default NotificationsPage;

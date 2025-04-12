
import { MainLayout } from "@/components/layout/MainLayout";
import { Megaphone } from "lucide-react";

export default function Announcements() {
  // Mock announcements data
  const announcements = [
    {
      id: '1',
      title: 'Website Update Coming Soon',
      date: '2025-05-01',
      content: 'We\'re excited to announce that a major update to the website will be rolled out next week. Expect improved performance, a refreshed user interface, and some exciting new features!'
    },
    {
      id: '2',
      title: 'New Manga Additions',
      date: '2025-04-28',
      content: 'We\'ve added over 50 new manga series to our library. Check out the latest additions in the Browse section!'
    },
    {
      id: '3',
      title: 'Scheduled Maintenance',
      date: '2025-04-25',
      content: 'The website will be undergoing scheduled maintenance on Saturday, April 25th from 2AM to 4AM UTC. During this time, the site may be temporarily unavailable.'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Announcements</h1>
        
        {announcements.length === 0 ? (
          <div className="bg-card p-8 rounded-lg text-center">
            <p className="text-muted-foreground">No announcements at this time.</p>
            <p className="mt-2">Check back later for updates!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-card p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Megaphone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-semibold">{announcement.title}</h2>
                      <span className="text-sm text-muted-foreground">{formatDate(announcement.date)}</span>
                    </div>
                    <p className="text-muted-foreground">{announcement.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

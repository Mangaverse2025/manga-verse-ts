
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type GroupCategory = 'followed' | 'my-groups';

export default function MyGroups() {
  const [activeCategory, setActiveCategory] = useState<GroupCategory>('followed');
  
  // Mock data for groups
  const followedGroups = [
    { id: '1', name: 'Manga Enthusiasts', avatar: 'ME', memberCount: 1245, description: 'Fast translations for popular manga.' },
    { id: '2', name: 'Webtoon Translators', avatar: 'WT', memberCount: 872, description: 'High quality Korean webtoon translations.' },
    { id: '3', name: 'Seinen Scanners', avatar: 'SS', memberCount: 653, description: 'Specializing in seinen manga translations.' },
    { id: '4', name: 'Shoujo Squad', avatar: 'SQ', memberCount: 921, description: 'Translating the latest shoujo manga.' },
  ];
  
  const myGroups = [
    { id: '5', name: 'Fantasy Fans', avatar: 'FF', memberCount: 356, description: 'Group for fantasy manga lovers.' },
    { id: '6', name: 'Manga Book Club', avatar: 'BC', memberCount: 112, description: 'Weekly manga reading and discussions.' },
  ];

  const groups = activeCategory === 'followed' ? followedGroups : myGroups;

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Groups</h1>
        
        <div className="flex gap-2 pb-2 border-b">
          <Button 
            variant={activeCategory === 'followed' ? 'default' : 'outline'} 
            onClick={() => setActiveCategory('followed')}
          >
            Followed
          </Button>
          <Button 
            variant={activeCategory === 'my-groups' ? 'default' : 'outline'} 
            onClick={() => setActiveCategory('my-groups')}
          >
            My Groups
          </Button>
        </div>
        
        {groups.length === 0 ? (
          <div className="bg-card p-8 rounded-lg text-center">
            <p className="text-muted-foreground">No groups in this category.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {groups.map((group) => (
              <div key={group.id} className="flex items-center gap-4 p-4 bg-card rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://i.pravatar.cc/48?u=${group.id}`} alt={group.name} />
                  <AvatarFallback>{group.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                  <p className="text-xs mt-1">{group.memberCount} members</p>
                </div>
                <Button size="sm" variant={activeCategory === 'followed' ? 'outline' : 'default'}>
                  {activeCategory === 'followed' ? 'Unfollow' : 'View'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

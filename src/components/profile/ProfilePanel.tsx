
import { Link } from "react-router-dom";
import { 
  User, 
  BookOpen, 
  BookMarked, 
  Users, 
  Group, 
  Megaphone, 
  LogOut,
  Settings 
} from "lucide-react";
import { useState } from "react";
import { LoginModal } from "@/components/auth/LoginModal";

export function ProfilePanel() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="py-2">
      <div className="px-2 pb-2">
        <p className="text-sm font-medium">Welcome back!</p>
        <p className="text-xs text-muted-foreground">Manage your account</p>
      </div>
      
      {/* Section 1: Navigation Links */}
      <div className="grid gap-1">
        <Link 
          to="/profile" 
          className="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors"
        >
          <User className="h-4 w-4" />
          <span>My Profile</span>
        </Link>
        
        <Link 
          to="/continue-reading" 
          className="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          <span>Continue Reading</span>
        </Link>
        
        <Link 
          to="/bookmarks" 
          className="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors"
        >
          <BookMarked className="h-4 w-4" />
          <span>Bookmarks</span>
        </Link>
        
        <Link 
          to="/follows" 
          className="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors"
        >
          <Users className="h-4 w-4" />
          <span>Follows</span>
        </Link>
        
        <Link 
          to="/my-groups" 
          className="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors"
        >
          <Group className="h-4 w-4" />
          <span>My Groups</span>
        </Link>
        
        <Link 
          to="/announcements" 
          className="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors"
        >
          <Megaphone className="h-4 w-4" />
          <span>Announcements</span>
        </Link>
      </div>
      
      {/* Section 2: Settings and Auth */}
      <div className="border-t border-border mt-2 pt-2 grid gap-1">
        <Link 
          to="/settings" 
          className="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
        
        <button 
          className="flex items-center gap-2 px-2 py-2 text-sm w-full text-left rounded-md hover:bg-accent transition-colors"
          onClick={() => setIsLoginModalOpen(true)}
        >
          <User className="h-4 w-4" />
          <span>Log in</span>
        </button>
        
        <button 
          className="flex items-center gap-2 px-2 py-2 text-sm w-full text-left rounded-md hover:bg-accent transition-colors text-destructive"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </button>
      </div>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
}


import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Search, Bell, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <header className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
            <div className="px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="lg:hidden">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <span className="sr-only">Toggle sidebar</span>
                    <Search className="h-5 w-5" />
                  </Button>
                </SidebarTrigger>
                <div className="hidden md:flex max-w-md relative">
                  <Input 
                    type="search" 
                    placeholder="Search manga..." 
                    className="pl-10"
                  />
                  <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

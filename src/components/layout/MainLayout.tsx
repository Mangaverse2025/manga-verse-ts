
import { AppHeader } from "./AppHeader";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 container mx-auto max-w-screen-2xl">{children}</main>
    </div>
  );
}

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  userName?: string;
  onLogout?: () => void;
}

export function MainLayout({ children, userName, onLogout }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar onLogout={onLogout} />
        
        <div className="flex flex-1 flex-col">
          <Header userName={userName} onLogout={onLogout} />
          
          <main className="flex-1 overflow-auto bg-background p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

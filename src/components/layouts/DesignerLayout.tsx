import { AppSidebar } from "@/components/designer/Sidebar";
import { Header } from "@/components/crm/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

interface DesignerLayoutProps {
  children: React.ReactNode;
}

export function DesignerLayout({ children }: DesignerLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
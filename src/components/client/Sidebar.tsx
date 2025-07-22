import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users,
  HelpCircle,
  Activity,
  FolderOpen,
  MessageCircle,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  User,
  Eye,
  FileText,
  MessageSquare,
  Receipt,
  ChevronDown,
  ChevronRight
} from "lucide-react";
const logo = "/lovable-uploads/a09bbeec-4835-42c5-ac6b-dee617792106.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const workspaceItems = [
  { title: "Dashboard", url: "/client/dashboard", icon: LayoutDashboard },
  { title: "Chat", url: "/client/chat", icon: MessageCircle },
  { title: "Statistics", url: "/client/statistics", icon: BarChart3 },
  { title: "Notifications", url: "/client/notifications", icon: Bell },
  { title: "Duck AI", url: "/client/duck-ai", icon: MessageCircle },
  { title: "Settings", url: "/client/settings", icon: Settings },
];

const managementItems = [
  { title: "Clients", url: "/client/clients-management", icon: Users },
  { title: "Designers", url: "/client/designer-management", icon: User },
  { title: "Projects", url: "/client/projects-management", icon: FolderOpen, subItems: [
    { title: "Overview", url: "/client/projects-management", icon: Eye },
    { title: "Contract", url: "/client/projects-management/design", icon: FileText },
    { title: "RFQ", url: "/client/projects-management/manufacturing", icon: MessageSquare },
    { title: "Invoice", url: "/client/projects-management/completed", icon: Receipt },
  ]},
];

interface SidebarSectionProps {
  title: string;
  items: Array<{
    title: string;
    url: string;
    icon: React.ComponentType<any>;
  }>;
}

interface ManagementSectionProps {
  title: string;
  items: Array<{
    title: string;
    url: string;
    icon: React.ComponentType<any>;
    subItems?: Array<{
      title: string;
      url: string;
      icon: React.ComponentType<any>;
    }>;
  }>;
}

function SidebarSection({ title, items }: SidebarSectionProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { state } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.url;
            
            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <NavLink to={item.url}>
                    <Icon className="h-4 w-4" />
                    {state !== "collapsed" && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function ManagementSection({ title, items }: ManagementSectionProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { state } = useSidebar();
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.url;
            
            return (
              <SidebarMenuItem key={item.url}>
                {item.subItems ? (
                  <>
                    <SidebarMenuButton className="w-full">
                      <Icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                      {state !== "collapsed" && (
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                      )}
                    </SidebarMenuButton>
                    {state !== "collapsed" && (
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = currentPath === subItem.url;
                          
                          return (
                            <SidebarMenuSubItem key={subItem.url}>
                              <SidebarMenuSubButton asChild isActive={isSubActive}>
                                <NavLink to={subItem.url}>
                                  <SubIcon className="h-4 w-4" />
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton asChild isActive={isActive}>
                    <NavLink to={item.url}>
                      <Icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="w-56">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2">
          <img 
            src={logo} 
            alt="Company Logo" 
            className="h-10 w-auto object-contain flex-shrink-0"
          />
          {state !== "collapsed" && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">Paking Duck</span>
              <span className="text-sm text-muted-foreground">Client Portal</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarSection title="Main" items={workspaceItems.slice(0, 1)} />
        <ManagementSection title="Management" items={managementItems} />
        <SidebarSection title="Workspace" items={workspaceItems.slice(1, 4)} />
        <SidebarSection title="AI & Settings" items={[workspaceItems[4], workspaceItems[5]]} />
      </SidebarContent>
    </Sidebar>
  );
}
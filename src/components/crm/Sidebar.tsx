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
  ChevronRight,
  CheckSquare,
  BookOpen,
  Star,
  Briefcase
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

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Projects", url: "/projects", icon: FolderOpen },
  { title: "My Tasks", url: "/my-tasks", icon: CheckSquare },
  { title: "Activity", url: "/activity", icon: Activity },
];

const communicationItems = [
  { title: "Chat", url: "/chat", icon: MessageCircle },
  { title: "Duck AI", url: "/duck-ai", icon: MessageCircle },
  { title: "Community", url: "/community", icon: Users },
];

const supportItems = [
  { title: "How-To Guides", url: "/how-to", icon: BookOpen },
  { title: "Help Center", url: "/guide", icon: HelpCircle },
  { title: "RFQ", url: "/rfq", icon: MessageSquare },
];

const accountItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Payment", url: "/payment", icon: CreditCard },
  { title: "Invoice", url: "/invoice", icon: Receipt },
  { title: "Statistics", url: "/statistics", icon: BarChart3 },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
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

// ... keep existing code (ManagementSection - not used in client portal but keeping for potential future use)

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
              <span className="font-bold text-lg text-foreground">Client Portal</span>
              <span className="text-sm text-muted-foreground">Design Services</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarSection title="Main" items={mainItems} />
        <SidebarSection title="Communication" items={communicationItems} />
        <SidebarSection title="Support" items={supportItems} />
        <SidebarSection title="Account" items={accountItems} />
      </SidebarContent>
    </Sidebar>
  );
}
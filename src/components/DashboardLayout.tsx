
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/toaster";
import {
  BarChart2,
  Search,
  MapPin,
  Users,
  LineChart,
  Settings as SettingsIcon,
  LogOut,
  Home,
  UserPlus,
  FileBarChart,
  Database,
  FileText,
  Bot,
  MessageSquare,
  Sparkles,
  Zap,
  Brain,
  CreditCard,
} from "lucide-react";
import { useTier } from "@/contexts/TierContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { currentTier } = useTier();
  const location = useLocation();

  const mainNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart2 },
    { name: "Restaurant Intelligence", href: "/intelligence", icon: Brain },
    { name: "Market Research", href: "/research", icon: Search },
    { name: "Location Analysis", href: "/location", icon: MapPin },
    { name: "Market Intelligence", href: "/competitive-analysis", icon: UserPlus },
    { name: "Team Management", href: "/team-management", icon: Users },
    { name: "Reports", href: "/reports", icon: FileText },
    { name: "Data Integration", href: "/data-integration", icon: Database },
    { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
    { name: "Pricing", href: "/pricing", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader className="border-b border-border">
            <Link to="/" className="flex items-center gap-2 px-4 py-3">
              <div className="h-8 w-8 rounded-md bg-bite-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="font-bold text-xl text-foreground">BiteBase<span className="text-bite-600">AI</span></span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainNavItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.name}
                        isActive={location.pathname === item.href}
                      >
                        <Link to={item.href}>
                          <item.icon />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Settings">
                      <Link to="/settings">
                        <SettingsIcon />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Return to Home">
                      <Link to="/">
                        <Home />
                        <span>Landing Page</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-border p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  U
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium leading-none truncate">User</p>
                <p className="text-xs text-muted-foreground">
                  {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)} Plan
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex h-14 items-center border-b border-border px-4">
            <SidebarTrigger className="mr-2" />
            <div className="flex-1" />
            <Button size="sm" variant="outline" className="mr-2">
              Upgrade Plan
            </Button>
          </div>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}

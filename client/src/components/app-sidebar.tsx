import { Home, Map, Calendar, Award, Package, Settings, LogOut, Leaf } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

const municipalItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Contenedores",
    url: "/containers",
    icon: Map,
  },
  {
    title: "Eventos",
    url: "/events",
    icon: Calendar,
  },
  {
    title: "Sistema de Puntos",
    url: "/points",
    icon: Award,
  },
  {
    title: "Retiros",
    url: "/pickups",
    icon: Package,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
            <Leaf className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-serif text-sidebar-foreground">EcoResiduos</h2>
            <p className="text-xs text-sidebar-foreground/80">Gestión Municipal</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión Municipal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {municipalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={`link-${item.title.toLowerCase()}`}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings" data-testid="link-settings">
                <Settings className="h-5 w-5" />
                <span>Configuración</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => console.log('Logout clicked')} data-testid="button-logout">
              <LogOut className="h-5 w-5" />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

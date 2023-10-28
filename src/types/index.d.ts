export interface AppConfig {
  name: string;
  version: string;
  description: string;
  sidebarLinks: SidebarLink[];
  mainNavLinks: MainNavLink[];
}

export interface MainNavLink {
  label: string;
  href: string;
  icon?: string;
}

export interface SidebarLink {
  label: string;
  href: string;
  icon?: string;
}

export interface User {
  id: number;
  name: string;
  is_active: boolean;
  updated_at: string;
  tenant_id: number;
  email: string;
  designation: string;
  created_at: string;
}
export interface News {
  id: number;
  title: string;
  description: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

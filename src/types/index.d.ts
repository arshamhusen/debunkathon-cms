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
  created_at: string;
}
export interface News {
  id: string;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
  source_id: UUID;
  is_active: boolean;
  source_url: string;
  source_name: string;
  reference_urls: string[];
  score: number;
  rating: string;
}

import { AppConfig } from "@/types";

export const appConfig: AppConfig = {
  name: "Debunker CMS",
  description: "Debunker CMS",
  version: "1.0.0",
  sidebarLinks: [
    { label: "Dashboard", href: "/", icon: "dashboard" },
    { label: "Debunkers", href: "/debunkers", icon: "debunkers" },
  ],
  mainNavLinks: [],
};

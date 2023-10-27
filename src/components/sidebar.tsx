"use client";

import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { SidebarLink } from "@/types";
import Icon from "./Icon";
import { useState } from "react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarLink[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  //@ts-ignore
  let [collapsed, setCollapsed] = useState(true);
  const pathname = window.location.pathname;

  return (
    <nav
      className={cn(
        collapsed ? "items-center w-20" : "items-start w-64",
        "hidden  lg:flex space-x-2  h-full min-h-screen lg:flex-col lg:justify-start border-r   lg:space-x-0 lg:space-y-2",
        className
      )}
      {...props}
    >
      <img src="/.png" alt=" Logo" className="py-2" />
      <div className="nav-items">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              collapsed ? "w-12" : "w-full",
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-center p-6 my-6 flex space-x-2"
            )}
          >
            <Icon
              name={item.icon ?? item.label?.toLocaleLowerCase()}
              className="bg-red-400"
            />
            {collapsed ? null : <span>{item.label}</span>}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

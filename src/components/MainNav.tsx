import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {}

export function MainNav({ className, ...props }: MainNavProps) {
  const location = useLocation();

  const items = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/ai-assistant",
      label: "AI Assistant",
    },
    {
      href: "/autorag",
      label: "Knowledge Search",
    },
    {
      href: "/math",
      label: "Math Solver",
    },
    {
      href: "/settings",
      label: "Settings",
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

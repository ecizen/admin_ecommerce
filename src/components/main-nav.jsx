"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({ className, ...props }) {
  const { storeId } = useParams();
  const pathname = usePathname();

  const routes = [
    {
      href: `/${storeId}`,
      label: "Dashboard",
    },
    {
      href: `/${storeId}/banners`,
      label: "Banners",
    },
    {
      href: `/${storeId}/categories`,
      label: "Categories",
    },
    {
      href: `/${storeId}/products`,
      label: "Products",
    },
    {
      href: `/${storeId}/settings`,
      label: "Settings",
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === route.href
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
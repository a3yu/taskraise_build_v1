"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const pages = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Services", path: "/dashboard/services" },
  { name: "Organization", path: "/dashboard/organization" },
];

function DashboardNavigationBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  return (
    <div>
      <nav
        className={cn("flex items-center px-40 border-b-2", className)}
        {...props}
      >
        {pages.map((value) => {
          return (
            <div
              key={value.name}
              className={`transition duration-300 ease-in-out hover:cursor-pointer ${
                pathname == value.path
                  ? "border-b-[3px] border-primary py-3 px-5 bg-purple-50"
                  : "hover:bg-purple-50 py-3 px-5"
              }`}
            >
              <Link
                key={value.path}
                href={value.path}
                className="font-semibold"
              >
                {value.name}
              </Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export default DashboardNavigationBar;

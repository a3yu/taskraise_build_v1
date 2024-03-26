"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Logo from "@/public/black.svg";
import Image from "next/image";
import { CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";

function DashboardNavigationBar({
  profile,
  organization,
}: {
  profile: Tables<"profiles">;
  organization: Tables<"organization_members">[];
}) {
  const supabase = createClient();
  const router = useRouter();
  return (
    <div>
      <nav className="flex items-center px-20 border-b-2 -mb-6">
        <div className="flex">
          <Image
            src={Logo}
            alt="Logo"
            height={70}
            className="hover:cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          />
          <h1
            className="font-bold text-xl my-auto -ml-2 hover:cursor-pointer text-black"
            onClick={() => {
              router.push("/");
            }}
          >
            TaskRaise
          </h1>
        </div>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUser className="h-7 w-7 hover:cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {organization.length == 1 && (
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Dashboard
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => {
                  router.push("/marketplace");
                }}
              >
                Marketplace
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  supabase.auth.signOut().then(() => {
                    router.push("/");
                  });
                }}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}

export default DashboardNavigationBar;

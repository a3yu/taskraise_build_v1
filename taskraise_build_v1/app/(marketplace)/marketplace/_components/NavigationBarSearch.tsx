import React, { useState } from "react";
import Logo from "@/public/black.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Search,
  UserCircle,
  UserCircle2,
  UserCircleIcon,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

function NavigationBarSearch({ user }: { user: User | null }) {
  const supabase = createClient();
  const [search, setSearch] = useState<string | null>();
  const [userState, setUserState] = useState(user);
  const onSearch = () => {
    if (search) {
      router.push("/marketplace?search=" + search);
    }
  };
  const router = useRouter();
  return (
    <div className="px-0 sm:px-10 border-b">
      <div className="w-full flex justify-between sm:hidden">
        <div className="flex">
          <Image
            src={Logo}
            alt="Logo"
            height={80}
            className="hover:cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          />
          <h1
            className="font-bold text-xl my-auto -ml-2 hover:cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            TaskRaise
          </h1>
        </div>
        {!(userState == null) && (
          <div className="flex space-x-7 mr-3">
            <h2 className="font-semibold my-auto text-gray-600 hover:cursor-pointer">
              <Link href={"/orders"}>Orders</Link>
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserCircleIcon className="my-auto mx-auto h-7 w-7 text-gray-600" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => {
                    supabase.auth.signOut();
                    setUserState(null);
                  }}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {userState == null && (
          <div className="flex space-x-7 mr-3">
            <h2 className="font-semibold my-auto text-gray-600 hover:cursor-pointer">
              <Link href={"/sign-in"}>Sign In</Link>
            </h2>
            <h2 className="font-semibold my-auto text-gray-600 hover:cursor-pointer">
              <Link href={"/sign-up"}>Sign Up</Link>
            </h2>
          </div>
        )}
      </div>
      <div className="flex my-auto pb-5 pt-0 sm:py-0">
        <Image
          src={Logo}
          alt="Logo"
          height={80}
          className="hover:cursor-pointer hidden sm:inline "
          onClick={() => {
            router.push("/");
          }}
        />
        <h1
          className="font-bold text-xl my-auto -ml-2 hover:cursor-pointer hidden sm:inline"
          onClick={() => {
            router.push("/");
          }}
        >
          TaskRaise
        </h1>
        <Input
          className="my-auto ml-6 min-w-40 rounded-br-none rounded-tr-none"
          placeholder="Search..."
          onSubmit={onSearch}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSearch();
            }
          }}
        />
        <Button
          className="my-auto bg-black hover:bg-gray-800 rounded-bl-none rounded-tl-none"
          onClick={onSearch}
        >
          <Search height={18} />
        </Button>

        <div className="mx-10 space-x-7 hidden sm:flex items-center">
          {!(userState == null) && (
            <div className="flex space-x-7 mr-3">
              <h2 className="font-semibold my-auto text-gray-600 hover:cursor-pointer">
                <Link href={"/orders"}>Orders</Link>
              </h2>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserCircleIcon className="my-auto mx-auto h-7 w-7 text-gray-600" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => {
                      supabase.auth.signOut();
                      setUserState(null);
                    }}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          {userState == null && (
            <div className="flex space-x-7 mr-3">
              <Button>
                <Link href={"/sign-in"}>Sign In</Link>
              </Button>
              <Button variant={"outline"}>
                <Link href={"/sign-up"}>Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavigationBarSearch;

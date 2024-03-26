import React, { useState } from "react";
import Logo from "@/public/black.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  BadgeCent,
  Building,
  CircleFadingPlus,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Search,
  UserCircle,
  UserCircle2,
  UserCircleIcon,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { ProfileWithOrganization } from "../types";
import CreateOrganization from "@/app/(home)/_components/CreateOrganization";
import Invites from "@/app/(home)/_components/Invites";

function NavigationBarSearch({
  profile,
}: {
  profile: ProfileWithOrganization | null;
}) {
  const [openOrg, setOpenOrg] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);
  const supabase = createClient();
  const [search, setSearch] = useState<string | null>();
  const [profileState, setProfileState] = useState(profile);
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
        {!(profileState == null) && (
          <>
            <CreateOrganization
              open={openOrg}
              setOpen={setOpenOrg}
              profile={profileState}
              setProfile={setProfileState}
            />
            <Invites
              open={openInvite}
              setOpen={setOpenInvite}
              profile={profileState}
              setProfile={setProfileState}
            />
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
                      setProfileState(null);
                    }}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
        {profileState == null && (
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
          {!(profileState == null) && (
            <div className="flex space-x-7 mr-3">
              <h2 className="font-semibold my-auto text-gray-600 hover:cursor-pointer">
                <Link href={"/orders"}>Orders</Link>
              </h2>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserCircleIcon className="my-auto mx-auto h-7 w-7 text-gray-600" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {profileState.organization_members.length != 0 && (
                    <DropdownMenuItem
                      onClick={() => {
                        router.push("/dashboard");
                      }}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  {profileState.organization_members.length == 0 && (
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <BadgeCent className="mr-2 h-4 w-4" />
                        <span>Fundraising</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setOpenOrg(true);
                            }}
                          >
                            <CircleFadingPlus className="mr-2 h-4 w-4" />
                            <span>Create an Organization</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setOpenInvite(true);
                            }}
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>
                              Invites ({profileState.invitations.length})
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  )}
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => {
                      supabase.auth.signOut();
                      setProfileState(null);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          {profileState == null && (
            <div className="flex space-x-7 ml-auto">
              <Button className="bg-black hover:bg-gray-800">
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

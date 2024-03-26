"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  BadgeCent,
  Brush,
  CircleFadingPlus,
  Container,
  Laptop,
  MessageSquare,
  PersonStanding,
  Search,
  UserCircleIcon,
} from "lucide-react";
import Logo from "@/public/black.svg";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import Image123 from "@/public/imagetop.svg";
import { ProfileWithOrganization } from "@/app/(marketplace)/marketplace/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateOrganization from "./CreateOrganization";
import Invites from "./Invites";
import Profile from "@/app/_components/Profile";

function HomePage({ profile }: { profile: ProfileWithOrganization | null }) {
  const supabase = createClient();
  const router = useRouter();
  const [search, setSearch] = useState<string | null>();
  const [userState, setUserState] = useState(profile);
  const [openOrg, setOpenOrg] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);

  const onSearch = () => {
    if (search) {
      router.push("/marketplace?search=" + search);
    }
  };
  return (
    <div>
      <section className="space-y-6 pb-8 md:pb-12 bg-primary ">
        <div className="p-5 px-10 -mt-2 ">
          <section className="flex">
            <div className="flex items-center">
              <Image
                src={Logo}
                alt="Logo"
                height={80}
                className="hover:cursor-pointer filter brightness-0 invert"
              />
              <h1 className="font-bold text-xl my-auto -ml-2 hover:cursor-pointer text-white">
                TaskRaise
              </h1>
            </div>
            <div className="flex space-x-8 ml-10"></div>
            <div className="my-auto ml-auto">
              {!userState ? (
                <>
                  <Button className="ml-auto" variant={"outline"}>
                    <Link href={"/sign-in"}>Sign In</Link>
                  </Button>
                  <Button className="ml-2 text-white" variant="link">
                    <Link href={"/sign-up"}>Sign Up</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Profile
                    userState={userState}
                    setUserState={setUserState}
                    openInvite={openInvite}
                    setOpenInvite={setOpenInvite}
                    openOrg={openOrg}
                    setOpenOrg={setOpenOrg}
                  />
                </>
              )}
            </div>
          </section>
        </div>
        <div className="">
          <div className="flex px-32 -mt-10">
            <div className="container flex flex-col gap-4 my-auto ">
              <h1 className="font-heading text-white text-left font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground ">
                Find the right service.
                <br /> Support a cause.
              </h1>
              <div className="flex mt-7">
                <Input
                  className="my-auto min-w-40 w-8/12 rounded-tr-none rounded-br-none bg-white"
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
                  className="my-auto bg-black hover:bg-gray-800 rounded-tl-none rounded-bl-none"
                  onClick={onSearch}
                >
                  <Search height={18} />
                </Button>
              </div>
            </div>
            <div className="">
              <Image
                src={Image123}
                alt="1"
                className="hidden md:inline"
                height={900}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container mt-5 space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24 ">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-foreground">
            Fund Dreams.
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            From <b>mowing lawns</b> to <b>graphic design</b>, find
            organizations that provide the services you need. Using these
            services supports organizations fundraising efforts and helps them
            reach their goals.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <Brush className="text-primary" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Graphic Design</h3>
                <p className="text-sm text-muted-foreground">
                  Get a logo, branding, or other graphic design services.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0  24 24" className="h-12 w-12 fill-current">
                <PersonStanding className="text-primary" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">General Work</h3>
                <p className="text-sm text-muted-foreground">
                  Tap into local organizations to get your lawn mowed, groceries
                  delivered, or other general work.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="h-12 w-12 fill-current"
              >
                <Laptop className="text-primary" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Web Design</h3>
                <p className="text-sm text-muted-foreground">
                  Get a website designed for your needs.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
                <Container className="text-primary" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Business Solutions</h3>
                <p className="text-sm text-muted-foreground">
                  Get your business needs met through things like social media
                  management, inventory management, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

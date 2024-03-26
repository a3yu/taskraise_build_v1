import React from "react";
import CreateOrganization from "../(home)/_components/CreateOrganization";
import Invites from "../(home)/_components/Invites";
import Link from "next/link";
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
import { createClient } from "@/utils/supabase/client";
import {
  BadgeCent,
  CircleFadingPlus,
  MessageSquare,
  UserCircleIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ProfileWithOrganization } from "../(marketplace)/marketplace/types";
import { Button } from "@/components/ui/button";

function Profile({
  userState,
  setUserState,
  openOrg,
  setOpenOrg,
  openInvite,
  setOpenInvite,
}: {
  userState: ProfileWithOrganization;
  setUserState: React.Dispatch<
    React.SetStateAction<ProfileWithOrganization | null>
  >;
  openOrg: boolean;
  setOpenOrg: React.Dispatch<React.SetStateAction<boolean>>;
  openInvite: boolean;
  setOpenInvite: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const supabase = createClient();
  const router = useRouter();
  return (
    <>
      <CreateOrganization
        open={openOrg}
        setOpen={setOpenOrg}
        profile={userState}
        setProfile={setUserState}
      />
      <Invites
        open={openInvite}
        setOpen={setOpenInvite}
        profile={userState}
        setProfile={setUserState}
      />
      <div className="flex space-x-7 mr-3">
        {userState.organization_members.length == 0 && (
          <h2 className="font-semibold my-auto text-white hover:cursor-pointer">
            <Link href={"/orders"}>Orders</Link>
          </h2>
        )}
        {userState.organization_members.length != 0 && (
          <h2 className="font-semibold my-auto text-white hover:cursor-pointer">
            <Link href={"/dashboard"}>Dashboard</Link>
          </h2>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserCircleIcon className="my-auto mx-auto h-7 w-7 text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {userState.organization_members.length == 1 && (
              <DropdownMenuItem
                onClick={() => {
                  router.push("/orders");
                }}
              >
                Orders
              </DropdownMenuItem>
            )}
            {userState.organization_members.length == 0 && (
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
                      <span>Invites ({userState.invitations.length})</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            )}
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
    </>
  );
}

export default Profile;

import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import AuthGraphic from "@/public/graphics/AuthPageGraphic.svg";
import DashboardNavigationBar from "./_components/DashboardNavigationBar";
import { getProfile } from "@/utils/functions/profiles/profilesQuery";
import { getOrganizationById } from "@/utils/functions/organizations/organizationsQuery";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    redirect("/");
  } else {
    const profile = await getProfile();
    if (profile == null) {
      redirect("/");
    }
    const organization = await getOrganizationById(profile.id);
    return (
      <div>
        <DashboardNavigationBar profile={profile} organization={organization} />
        <div className="px-20 py-12">{children}</div>
      </div>
    );
  }
}

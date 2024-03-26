import React from "react";
import Dashboard from "./_components/_dashboard/Dashboard";
import { getOrganizationAll } from "@/utils/functions/organizations/organizationsQuery";
import {
  getProfile,
  getProfileOrganization,
} from "@/utils/functions/profiles/profilesQuery";
import { redirect } from "next/navigation";

async function DashboardPage() {
  const profileOrganization = await getProfileOrganization();
  if (profileOrganization.organization_members.length != 0) {
    const organizationData = await getOrganizationAll(
      profileOrganization.organization_members[0].id
    );

    const profile = await getProfile();
    if (profile == null) {
      redirect("/");
    }
    return (
      <div>
        <Dashboard profileData={profile} organizationData={organizationData} />
      </div>
    );
  } else {
    redirect("/");
  }
}

export default DashboardPage;

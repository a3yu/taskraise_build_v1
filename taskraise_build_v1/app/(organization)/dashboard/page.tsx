import React from "react";
import Dashboard from "./_components/_dashboard/Dashboard";
import { getOrganizationAll } from "@/utils/functions/organizations/organizationsQuery";
import {
  getProfile,
  getProfileOrganization,
} from "@/utils/functions/profiles/profilesQuery";

async function DashboardPage() {
  const profileOrganization = await getProfileOrganization();
  const organizationData = await getOrganizationAll(
    profileOrganization.organization_members[0].id
  );

  const profile = await getProfile();
  return (
    <div>
      <Dashboard profileData={profile} organizationData={organizationData} />
    </div>
  );
}

export default DashboardPage;

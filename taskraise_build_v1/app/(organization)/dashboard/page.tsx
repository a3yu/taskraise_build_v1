import React from "react";
import Dashboard from "./_components/_dashboard/Dashboard";
import { getOrganizationAll } from "@/utils/functions/organizations/organizationsQuery";
import {
  getProfile,
  getProfileOrganization,
} from "@/utils/functions/profiles/profilesQuery";

async function DashboardPage() {
  const profile = await getProfileOrganization();
  const organizationData = await getOrganizationAll(
    profile.organization_members[0].id
  );
  return (
    <div>
      <Dashboard organizationData={organizationData} />
    </div>
  );
}

export default DashboardPage;

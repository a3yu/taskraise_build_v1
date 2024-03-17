import React from "react";
import MembersTable from "./_components/MembersTable";
import { OrganizationData, ProfileWithMember } from "../../../../types";
import { Tables } from "@/types/supabase";

function Organization({
  profileData,
  organizationData,
  setOrganizationData,
}: {
  profileData: ProfileWithMember;
  organizationData: OrganizationData;
  setOrganizationData: React.Dispatch<React.SetStateAction<OrganizationData>>;
}) {
  return (
    <div>
      <MembersTable
        profileData={profileData}
        organizationData={organizationData}
        setOrganizationData={setOrganizationData}
      />
    </div>
  );
}

export default Organization;

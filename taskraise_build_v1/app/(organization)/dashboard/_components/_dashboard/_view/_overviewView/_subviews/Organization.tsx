import React from "react";
import MembersTable from "./_components/MembersTable";
import { OrganizationData } from "../../../../types";

function Organization({
  organizationData,
  setOrganizationData,
}: {
  organizationData: OrganizationData;
  setOrganizationData: React.Dispatch<React.SetStateAction<OrganizationData>>;
}) {
  return (
    <div>
      <MembersTable
        organizationData={organizationData}
        setOrganizationData={setOrganizationData}
      />
    </div>
  );
}

export default Organization;

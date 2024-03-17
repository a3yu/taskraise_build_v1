import { CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import Services from "./_serviceView/Services";
import { OrganizationData, ProfileWithMember } from "../../types";

function ServiceView({
  profileData,
  organizationData,
  setOrganizationData,
}: {
  profileData: ProfileWithMember;
  organizationData: OrganizationData;
  setOrganizationData: React.Dispatch<React.SetStateAction<OrganizationData>>;
}) {
  return (
    <>
      <CardContent>
        <Services
          organizationData={organizationData}
          setOrganizationData={setOrganizationData}
        />
      </CardContent>
    </>
  );
}

export default ServiceView;

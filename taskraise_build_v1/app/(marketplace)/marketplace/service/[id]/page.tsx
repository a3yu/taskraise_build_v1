import React from "react";
import ServicePage from "./_components/Service";
import { getProfile } from "@/utils/functions/profiles/profilesQuery";
import { getService } from "@/utils/functions/services/serviceQuery";

async function ServiceMain({ params }: { params: { id: string } }) {
  const profile = await getProfile();
  const service = await getService(params.id);

  return (
    <div>
      <ServicePage service={service[0]} profile={profile} />
    </div>
  );
}

export default ServiceMain;

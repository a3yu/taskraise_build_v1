import React, { Suspense } from "react";

import { redirect } from "next/navigation";
import ElementsForm from "./_components/PaymentsForm";
import { getProfile } from "@/utils/functions/profiles/profilesQuery";
import { getService } from "@/utils/functions/services/serviceQuery";

async function ServiceOrderMain({ params }: { params: { id: string } }) {
  const profile = await getProfile();
  if (!profile) {
    redirect("/login");
  }
  const service = await getService(params.id);
  return (
    <div>
      <Suspense>
        <ElementsForm profile={profile} service={service[0]} />
      </Suspense>
    </div>
  );
}

export default ServiceOrderMain;

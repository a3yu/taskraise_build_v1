import React from "react";

import { getProfile } from "@/utils/functions/profiles/profilesQuery";
import { getService } from "@/utils/functions/services/serviceQuery";
import Order from "./_components/Order";
import { getOrderWithMessages } from "@/utils/functions/messages/messageQuery";
import { redirect } from "next/navigation";

async function OrganizationOrders({ params }: { params: { id: string } }) {
  const order = await getOrderWithMessages(parseInt(params.id));
  if (order[0].status != "ONGOING") {
    redirect("/dashboard");
  }
  return (
    <div>
      <Order order={order[0]} />
    </div>
  );
}

export default OrganizationOrders;

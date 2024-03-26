import React, { Suspense } from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProfile } from "@/utils/functions/profiles/profilesQuery";
import { getOrderWithMessages } from "@/utils/functions/messages/messageQuery";
import Order from "./_components/Order";

async function OrderDetailsMain({ params }: { params: { id: string } }) {
  const profile = await getProfile();
  if (!profile) {
    redirect("/");
  }
  const order = await getOrderWithMessages(parseInt(params.id));
  if (order[0].status != "ONGOING") {
    redirect("/orders");
  }
  return (
    <div>
      <Order order={order[0]} profile={profile} />
    </div>
  );
}

export default OrderDetailsMain;

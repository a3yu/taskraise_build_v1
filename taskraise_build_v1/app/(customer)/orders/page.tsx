import { getOrderWithMessages } from "@/utils/functions/messages/messageQuery";
import { getProfile } from "@/utils/functions/profiles/profilesQuery";
import { getCustomerOrders } from "@/utils/functions/service_orders/serviceOrderQuery";
import React from "react";
import { redirect } from "next/navigation";
import Orders from "./_components/Order";

import { OrderWithOrganization } from "./type";
function sortOrders(orders: OrderWithOrganization[]): OrderWithOrganization[] {
  const orderPriority: { [key: string]: number } = {
    ONGOING: 1,
    INCOMING: 2,
    COMPLETED: 3,
    REJECTED: 4,
    DISPUTED: 5,
  };
  return orders.sort((a, b) => {
    return (orderPriority[a.status] || 4) - (orderPriority[b.status] || 4);
  });
}
async function OrdersPage() {
  const profile = await getProfile();
  if (!profile) {
    redirect("/");
  }
  const orders = await getCustomerOrders(profile.id);
  const sortedOrders = sortOrders(orders);
  return (
    <div>
      <Orders orders={sortedOrders} profile={profile} />
    </div>
  );
}

export default OrdersPage;

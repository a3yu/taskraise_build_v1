"use client";
import React from "react";
import { User } from "@supabase/supabase-js";
import NavigationBarSearch from "@/app/(marketplace)/marketplace/_components/NavigationBarSearch";
import { OrderTable } from "./OrderTable";

import { OrderWithOrganization } from "../type";
import { ProfileWithOrganization } from "@/app/(marketplace)/marketplace/types";

function Orders({
  orders,
  profile,
}: {
  orders: OrderWithOrganization[];
  profile: ProfileWithOrganization;
}) {
  return (
    <div>
      <NavigationBarSearch profile={profile} />
      <div className="px-24 py-10">
        <h1 className="text-3xl font-bold">Orders</h1>
        <OrderTable orders={orders} />
      </div>
    </div>
  );
}

export default Orders;

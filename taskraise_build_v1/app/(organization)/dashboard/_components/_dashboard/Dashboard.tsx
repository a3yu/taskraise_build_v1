"use client";
import React from "react";
import TotalFundsRaisedCard from "./_cards/TotalFundsRaisedCard";
import CampaignCard from "./_cards/CampaignCard";

import CompletedTasksCard from "./_cards/CompletedOrdersCard";
import MembersCard from "./_cards/MembersCard";
import MainViewCard from "./_cards/MainViewCard";
import OngoingOrdersCard from "./_cards/OngoingOrdersCard";
import CompletedOrdersCard from "./_cards/CompletedOrdersCard";
import IncomingOrdersCard from "./_cards/IncomingOrdersCard";
import { Tables } from "@/types/supabase";
import OrganizationTitleCard from "./_cards/OrganizationTitleCard";
import { OrganizationData } from "../types";

export const states = ["Overview", "Incoming", "Ongoing", "Campaign"];

function Dashboard({
  organizationData,
}: {
  organizationData: OrganizationData;
}) {
  const [displayState, setDisplayState] = React.useState(states[0]);
  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-12 xl:space-x-3">
        <div className="xl:col-span-4 space-y-3">
          <OrganizationTitleCard
            setState={setDisplayState}
            state={displayState}
          />
          <TotalFundsRaisedCard
            orders={organizationData.service_orders}
            state={displayState}
            setState={setDisplayState}
          />
        </div>
        <div className="xl:col-span-8 space-y-3">
          <div className="flex-row xl:flex xl:space-x-3 ">
            <IncomingOrdersCard
              state={displayState}
              setState={setDisplayState}
            />
            <OngoingOrdersCard
              state={displayState}
              setState={setDisplayState}
            />
            <CampaignCard state={displayState} setState={setDisplayState} />
          </div>
          <MainViewCard
            state={displayState}
            setState={setDisplayState}
            orderData={organizationData.service_orders}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

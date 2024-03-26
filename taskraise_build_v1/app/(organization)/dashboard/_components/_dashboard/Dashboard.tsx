"use client";
import React from "react";
import TotalFundsRaisedCard from "./_cards/TotalFundsRaisedCard";
import CampaignCard from "./_cards/CampaignCard";

import CompletedTasksCard from "./_cards/CompletedOrdersCard";

import MainViewCard from "./_cards/MainViewCard";

import CompletedOrdersCard from "./_cards/CompletedOrdersCard";

import { Tables } from "@/types/supabase";
import OrganizationTitleCard from "./_cards/OrganizationTitleCard";
import {
  OrganizationData,
  ProfileWithMember,
  ServiceOrderWithService,
} from "../types";
import OverviewCard from "./_cards/OverviewCard";
import OrdersCard from "./_cards/OrdersCard";
import ServicesCard from "./_cards/ServicesCard";
import EditOrganization from "./_components/EditOrganization";

export const states = ["Overview", "Orders", "Services"];

function Dashboard({
  profileData,
  organizationData,
}: {
  profileData: ProfileWithMember;
  organizationData: OrganizationData;
}) {
  const [organizationDataState, setOrganizationDataState] =
    React.useState<OrganizationData>(organizationData);
  const [orderData, setOrderData] = React.useState<ServiceOrderWithService[]>(
    organizationData.service_orders
  );
  const [displayState, setDisplayState] = React.useState(states[0]);
  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-12 xl:space-x-3">
        <div className="xl:col-span-4 space-y-3">
          <OrganizationTitleCard
            organization={organizationDataState}
            setOrganization={setOrganizationDataState}
            profile={profileData}
          />
          <TotalFundsRaisedCard
            orders={orderData}
            state={displayState}
            setState={setDisplayState}
          />
        </div>
        <div className="xl:col-span-8 space-y-3">
          <div className="flex-row xl:flex xl:space-x-3 ">
            <OverviewCard
              setState={setDisplayState}
              state={displayState}
              orders={orderData}
            />
            <OrdersCard
              setState={setDisplayState}
              state={displayState}
              orders={orderData}
            />
            <ServicesCard
              state={displayState}
              setState={setDisplayState}
              services={organizationData.services}
            />
          </div>
          <MainViewCard
            profileData={profileData}
            organizationData={organizationDataState}
            setOrganizationData={setOrganizationDataState}
            state={displayState}
            setState={setDisplayState}
            orderData={orderData}
            setOrderData={setOrderData}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

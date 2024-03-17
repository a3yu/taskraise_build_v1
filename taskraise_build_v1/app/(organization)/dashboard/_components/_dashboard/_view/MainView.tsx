import React from "react";
import { states } from "../Dashboard";
import OverviewView from "./OverviewView";
import { motion } from "framer-motion";
import { Tables } from "@/types/supabase";
import {
  OrganizationData,
  ProfileWithMember,
  ServiceOrderWithService,
} from "../../types";
import OrderView from "./OrderView";
import ServiceView from "./ServiceView";

function MainView({
  profileData,
  organizationData,
  setOrganizationData,
  state,
  orderData,
  setOrderData,
}: {
  profileData: ProfileWithMember;
  organizationData: OrganizationData;
  setOrganizationData: React.Dispatch<React.SetStateAction<OrganizationData>>;
  state: string;
  orderData: ServiceOrderWithService[];
  setOrderData: React.Dispatch<React.SetStateAction<ServiceOrderWithService[]>>;
}) {
  let Component = null;

  switch (state) {
    case states[0]:
      Component = (
        <OverviewView
          profileData={profileData}
          organizationData={organizationData}
          setOrganizationData={setOrganizationData}
        />
      );
      break;
    case states[1]:
      Component = <OrderView data={orderData} setData={setOrderData} />;
      break;
    case states[2]:
      Component = (
        <ServiceView
          organizationData={organizationData}
          setOrganizationData={setOrganizationData}
          profileData={profileData}
        />
      );
      break;
    default:
      break;
  }

  return (
    <>
      {Component && (
        <motion.div
          key={state}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.125 }}
        >
          {Component}
        </motion.div>
      )}
    </>
  );
}

export default MainView;

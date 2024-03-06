import React from "react";
import { states } from "../Dashboard";
import OverviewView from "./OverviewView";
import IncomingView from "./IncomingView";
import OngoingView from "./OngoingView";
import CompletedView from "./CompletedView";
import { motion } from "framer-motion";
import { Tables } from "@/types/supabase";
import { ServiceOrderWithService } from "../../types";

function MainView({
  state,
  orderData,
}: {
  state: string;
  orderData: ServiceOrderWithService[];
}) {
  let Component = null;

  switch (state) {
    case states[0]:
      Component = <OverviewView />;
      break;
    case states[1]:
      Component = <IncomingView data={orderData} />;
      break;
    case states[2]:
      Component = <OngoingView />;
      break;
    case states[3]:
      Component = <CompletedView />;
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

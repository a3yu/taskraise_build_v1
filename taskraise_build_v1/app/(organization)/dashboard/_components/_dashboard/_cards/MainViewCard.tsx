import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import MainView from "../_view/MainView";
import { states } from "../Dashboard";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { Tables } from "@/types/supabase";
import { OrganizationData, ServiceOrderWithService } from "../../types";

export default function MainViewCard({
  organizationData,
  setOrganizationData,
  state,
  setState,
  orderData,
  setOrderData,
}: {
  organizationData: OrganizationData;
  setOrganizationData: React.Dispatch<React.SetStateAction<OrganizationData>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  orderData: ServiceOrderWithService[];
  setOrderData: React.Dispatch<React.SetStateAction<ServiceOrderWithService[]>>;
}) {
  // Convert the state to an index for easier manipulation
  const stateIndex = states.indexOf(state);

  // Function to handle left arrow click
  const handleLeftClick = () => {
    if (stateIndex > 0) {
      setState(states[stateIndex - 1]);
    }
  };

  // Function to handle right arrow click
  const handleRightClick = () => {
    if (stateIndex < 3) {
      setState(states[stateIndex + 1]);
    }
  };

  return (
    <>
      <Card>
        <MainView
          organizationData={organizationData}
          setOrganizationData={setOrganizationData}
          state={state}
          orderData={orderData}
          setOrderData={setOrderData}
        />
      </Card>
    </>
  );
}

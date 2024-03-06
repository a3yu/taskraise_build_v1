import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import MainView from "../_view/MainView";
import { states } from "../Dashboard";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { Tables } from "@/types/supabase";
import { ServiceOrderWithService } from "../../types";

export default function MainViewCard({
  state,
  setState,
  orderData,
}: {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  orderData: ServiceOrderWithService[];
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
        <MainView state={state} orderData={orderData} />
      </Card>
    </>
  );
}

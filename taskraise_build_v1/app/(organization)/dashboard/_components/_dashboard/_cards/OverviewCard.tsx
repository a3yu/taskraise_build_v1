import { Card, CardHeader } from "@/components/ui/card";
import React from "react";
import { states } from "../Dashboard";
import { ServiceOrderWithService } from "../../types";

export default function OverviewCard({
  state,
  setState,
  orders,
}: {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  orders: ServiceOrderWithService[];
}) {
  // Function to calculate the total price for orders with a specific status
  const calculateTotalPrice = (status: string) => {
    return orders
      .filter((order) => order.status === status)
      .reduce((total, order) => total + order.price, 0);
  };

  const totalPriceCompleted = calculateTotalPrice("COMPLETED");
  const totalPriceIncoming = calculateTotalPrice("INCOMING");

  return (
    <>
      <Card
        className={`w-full cursor-pointer hover:scale-105 transition duration-150 ease-in-out ${
          state === states[0] ? "border-[3px] border-primary" : ""
        } transition-border duration-300 ease-in-out`}
        onClick={() => setState(states[0])}
      >
        <CardHeader>
          <div className="">
            <div className="flex">
              <h2 className="text-sm text-muted-foreground font-semibold">
                Overview
              </h2>
              <h2 className="text-md ml-auto text-primary font-semibold">
                +${totalPriceIncoming.toFixed(2)}
              </h2>
            </div>
            <h2 className="text-3xl font-semibold">
              ${totalPriceCompleted.toFixed(2)}
            </h2>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}

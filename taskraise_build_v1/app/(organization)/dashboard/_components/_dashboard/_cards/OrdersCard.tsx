import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRightCircle,
  ArrowUpCircle,
  CheckCircle,
  Diamond,
  MoreHorizontal,
} from "lucide-react";
import { states } from "../Dashboard";
import { ServiceOrderWithService } from "../../types";

export default function OrdersCard({
  state,
  setState,
  orders,
}: {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  orders: ServiceOrderWithService[];
}) {
  const countIncomingOrders = () => {
    return orders.filter((order) => order.status === "INCOMING").length;
  };
  const countOngoingOrders = () => {
    return orders.filter((order) => order.status === "ONGOING").length;
  };

  return (
    <>
      <Card
        className={`w-full cursor-pointer hover:scale-105 transition duration-150 ease-in-out ${
          state === states[1] ? "border-[3px] border-primary" : ""
        } transition-border duration-300 ease-in-out`}
        onClick={() => setState(states[1])}
      >
        <CardHeader>
          <div className="">
            <div className="flex">
              <h2 className="text-sm text-muted-foreground font-semibold">
                Orders
              </h2>
              <h2 className="text-md ml-auto text-primary font-semibold">
                +{countIncomingOrders()}{" "}
              </h2>
            </div>
            <h2 className="text-3xl font-semibold">{countOngoingOrders()}</h2>{" "}
          </div>
        </CardHeader>
      </Card>
    </>
  );
}

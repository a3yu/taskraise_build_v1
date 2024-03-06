"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { FaChevronUp } from "react-icons/fa";
import {
  CartesianAxis,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";
import { states } from "../Dashboard";
import { Tables } from "@/types/supabase";

const calculatePriceArray = (items: Tables<"service_orders">[]): number[] => {
  const pricesArray: number[] = [0];
  let total = 0;

  items.forEach((item) => {
    if (item.status === "COMPLETED") {
      total += item.price;
      pricesArray.push(total);
    }
  });

  return pricesArray;
};

function TotalFundsRaisedCard({
  state,
  setState,
  orders,
}: {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  orders: Tables<"service_orders">[];
}) {
  const money = calculatePriceArray(orders);
  return (
    <>
      <Card className={`w-full `}>
        <CardHeader>
          <div className="flex items-center">
            <h2 className="text-md font-semibold">Total Funds Raised</h2>
            <h2 className="text-xl font-bold ml-auto">${money.slice(-1)}</h2>
            <FaChevronUp className="fill-primary ml-2" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={money}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="1 1" />
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey={(v: number) => v}
                  stroke="#645CFF"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default TotalFundsRaisedCard;

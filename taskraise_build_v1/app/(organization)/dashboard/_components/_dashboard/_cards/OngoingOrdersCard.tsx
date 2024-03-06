"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Diamond, GaugeCircle } from "lucide-react";
import { states } from "../Dashboard";

export default function OngoingOrdersCard({
  state,
  setState,
}: {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <Card
        className={`w-full cursor-pointer hover:scale-105 transition duration-150 ease-in-out ${
          state === states[2] ? "border-b-4 border-b-primary" : ""
        } transition-border duration-300 ease-in-out`}
        onClick={() => setState(states[2])}
      >
        <CardHeader>
          <div className="flex items-center">
            <h2 className="text-md font-semibold">Ongoing Orders</h2>
            <div className="flex items-center ml-auto">
              <GaugeCircle className="ml-auto h-5 mr-1" />
              <h2 className="text-2xl font-bold">4</h2>
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}

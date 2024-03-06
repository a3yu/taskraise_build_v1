"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { FaChevronUp } from "react-icons/fa";
import { ProgressBlack } from "@/components/ui/progress";
import { MoreHorizontal } from "lucide-react";
import { states } from "../Dashboard";

export default function CampaignCard({
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
          state === states[3] ? "border-b-4 border-b-primary" : ""
        } transition-border duration-300 ease-in-out`}
        onClick={() => setState(states[3])}
      >
        <CardHeader>
          <div className="flex items-center">
            <h2 className="text-md font-semibold">FRC Worlds</h2>
            <h2 className="text-2xl font-bold ml-auto">76%</h2>
          </div>
        </CardHeader>
        <CardContent className="-mt-4">
          <ProgressBlack value={76} className="h-[5px]" />
        </CardContent>
      </Card>
    </>
  );
}

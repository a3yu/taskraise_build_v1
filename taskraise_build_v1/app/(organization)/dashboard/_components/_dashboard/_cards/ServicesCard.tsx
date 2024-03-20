"use client";
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
import { Tables } from "@/types/supabase";

export default function ServicesCard({
  state,
  setState,
  services,
}: {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  services: Tables<"services">[];
}) {
  return (
    <>
      <Card
        className={`w-full cursor-pointer hover:scale-105 transition duration-150 ease-in-out ${
          state === states[2] ? "border-[3px] border-primary" : ""
        } transition-border duration-300 ease-in-out`}
        onClick={() => setState(states[2])}
      >
        <CardHeader>
          <div className="">
            <h2 className="text-sm text-muted-foreground font-semibold">
              Services
            </h2>
            <h2 className="text-3xl font-semibold">{services.length}</h2>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}

"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { FaChevronUp } from "react-icons/fa";
import { Progress, ProgressBlack } from "@/components/ui/progress";
import { MoreHorizontal, PenLine } from "lucide-react";
import { states } from "../Dashboard";
import { Button } from "@/components/ui/button";

export default function CampaignCard() {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center">
            <h2 className="font-bold text-xl">FRC Worlds</h2>
            <Button size={"icon"} variant={"outline"} className="ml-auto ">
              <PenLine className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <Progress value={33} />
            <p className="text-sm">$200 out of $504</p>
          </div>
        </CardHeader>
        <CardContent className="-mt-4"></CardContent>
      </Card>
    </>
  );
}

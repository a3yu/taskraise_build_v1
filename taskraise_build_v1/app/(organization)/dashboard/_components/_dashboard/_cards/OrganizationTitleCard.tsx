"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRightCircle,
  Diamond,
  GaugeCircle,
  LocateIcon,
  MapPin,
  Pencil,
} from "lucide-react";
import { states } from "../Dashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function OrganizationTitleCard({
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
          state === states[0] ? "border-b-4 border-b-primary" : ""
        } transition-border duration-300 ease-in-out`}
        onClick={() => setState(states[0])}
      >
        <CardHeader>
          <div className="flex">
            <Avatar className="mr-4 h-14 w-14">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <h2 className="text-xl font-semibold align-text-top">
                  Lorem Ipsum Robotics
                </h2>
              </div>
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <p className="text-xs">Ithaca, NY, USA</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}

"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { MapPin, PenLine } from "lucide-react";
import { states } from "../Dashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function OrganizationTitleCard() {
  return (
    <>
      <Card className="border-none">
        <CardHeader>
          <div className="flex ">
            <Avatar className="mr-4 h-16 w-16">
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
            <Button size={"icon"} variant={"outline"} className="ml-auto ">
              <PenLine className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}

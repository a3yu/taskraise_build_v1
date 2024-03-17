import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PenLine } from "lucide-react";
import React, { Suspense } from "react";
import { OrderActivity } from "./_components/OrderActivity";
import CampaignCircularProgressBar from "./_components/CampaignCircularProgressBar";
import { OrganizationData } from "../../../../types";
import EditCampaign from "./_components/EditCampaign";

function Overview({
  organizationData,
  setOrganizationData,
}: {
  organizationData: OrganizationData;
  setOrganizationData: React.Dispatch<React.SetStateAction<OrganizationData>>;
}) {
  return (
    <div>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <Card className="w-1/3">
            <CardHeader>
              <div className="flex ">
                <h2 className="font-semibold">Campaign</h2>
                <div className="ml-auto">
                  <EditCampaign
                    organizationData={organizationData}
                    setOrganizationData={setOrganizationData}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CampaignCircularProgressBar
                campaign={
                  organizationData.campaigns ? organizationData.campaigns : null
                }
              />
            </CardContent>
          </Card>
          <Card className="w-2/3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <OrderActivity activities={organizationData.activities} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Overview;

"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { MapPin, PenLine } from "lucide-react";
import { states } from "../Dashboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import EditOrganization from "../_components/EditOrganization";
import { OrganizationData, ProfileWithMember } from "../../types";
import { createClient } from "@/utils/supabase/client";

export default function OrganizationTitleCard({
  organization,
  setOrganization,
  profile,
}: {
  organization: OrganizationData;
  profile: ProfileWithMember;
  setOrganization: React.Dispatch<React.SetStateAction<OrganizationData>>;
}) {
  const supabase = createClient();
  const [show, setShow] = React.useState(false);
  const [preview, setPreview] = React.useState("");
  useEffect(() => {
    async function downloadImage(pathPfp: string | null) {
      try {
        if (pathPfp) {
          const { data: pfpdata, error: pfperror } = await supabase.storage
            .from("public/org_pfps")
            .download(organization.id + "/" + pathPfp);
          if (pfperror) {
            return;
          }
          const urlPfp = URL.createObjectURL(pfpdata);
          setPreview(urlPfp);
        }
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }
    downloadImage(organization.pfp_path);
  }, [supabase, organization]);
  return (
    <>
      <EditOrganization
        organization={organization}
        setOrganization={setOrganization}
        setShow={setShow}
        show={show}
      />
      <Card className="border-none">
        <CardHeader>
          <div className="flex ">
            <Avatar className="mr-4 h-16 w-16">
              <AvatarImage src={preview} />
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
            <Button
              size={"icon"}
              variant={"outline"}
              className="ml-auto"
              onClick={() => {
                setShow(true);
              }}
            >
              <PenLine className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}

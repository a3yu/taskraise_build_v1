"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Calendar,
  CircleDollarSign,
  MapPin,
  Search,
  UserRound,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Tables } from "@/types/supabase";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { User } from "@supabase/supabase-js";
import NavigationBarSearch from "../../../_components/NavigationBarSearch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClient } from "@/utils/supabase/client";
import { ProfileWithOrganization, ServiceSearch } from "../../../types";

export default function ServicePage({
  service,

  profile,
}: {
  service: ServiceSearch;

  profile: ProfileWithOrganization | null;
}) {
  console.log(service);
  const router = useRouter();
  const supabase = createClient();
  const primaryCampaign = service.organizations.campaigns;
  const [search, setSearch] = useState<string | null>();
  const onSearch = () => {
    if (search) {
      router.push("/marketplace?search=" + search);
    }
  };
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(true);
  const [pfp, setPfp] = useState<string | null>(null);
  useEffect(() => {
    async function downloadImage(pathThumb: string, pathPfp: string | null) {
      try {
        const { data, error } = await supabase.storage
          .from("public/service_thumbnails")
          .download(pathThumb);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setThumbnail(url);
        if (pathPfp) {
          const { data: pfpdata, error: pfperror } = await supabase.storage
            .from("public/org_pfps")
            .download(pathPfp);
          if (pfperror) {
            throw error;
          }
          const urlPfp = URL.createObjectURL(pfpdata);
          setPfp(urlPfp);
        }
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }
    downloadImage(service.thumbnail_path, service.organizations.pfp_path);
  }, [supabase]);
  const onImageLoad = () => {
    setLoading(false);
  };

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(service.price);
  const date = new Date(service.organizations.created_at);
  function formatDollarAmounts(amount: number, total: number) {
    const formattedAmount = Math.round(amount);
    const formattedTotal = Math.round(total);

    return `$${formattedAmount} out of $${formattedTotal}`;
  }
  const [campaignDescription, setCampaignDescription] = useState(false);

  return (
    <div>
      {primaryCampaign && (
        <Dialog
          open={campaignDescription}
          onOpenChange={(open) => {
            setCampaignDescription(open);
          }}
        >
          <DialogContent>
            <h1 className="font-bold text-2xl">{primaryCampaign.title}</h1>
            <p>{primaryCampaign.description}</p>
          </DialogContent>
        </Dialog>
      )}
      <NavigationBarSearch profile={profile} />
      <div className="pt-10 px-10 sm:px-32 flex flex-wrap justify-center sm:justify-evenly">
        <div className="w-[300px] sm:w-[600px]  2xl:w-[700px] ">
          <h1 className="font-heading text-4xl font-semibold">
            {service.title}
          </h1>

          <div className="flex mb-6 mt-4">
            <Avatar className="h-12 w-12">
              {pfp && <AvatarImage src={pfp} alt="pfp" />}
              <AvatarFallback>
                <UserRound className="p-1" />
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <div>
                <h3 className="text-md font-medium">
                  {service.organizations.name}
                </h3>
              </div>
              <Separator orientation="horizontal" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  {service.organizations.location}
                </h3>
              </div>
            </div>
          </div>
          <div className="w-[300px] h-[166px] sm:w-[600px] sm:h-[332px] 2xl:w-[700px] 2xl:h-[388px] relative mx-auto">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={"thumbnail image"}
                layout="fill"
                objectFit="fill"
                onLoad={onImageLoad}
                className="rounded border"
                style={{ display: loading ? "none" : "block" }}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="sm:p-10 py-10">
          <Card className=" w-80 sm:w-[28rem] mx-auto">
            <CardContent className="p-5">
              <h3 className="font-bold text-2xl">Service</h3>
              {/* <p className="mt-1 text-lg">{organization.description}</p> */}
              <p className="mt-2 text-base">{service.description}</p>
              <div className="flex items-center mt-5">
                <MapPin />
                <p className="text-base ml-2 my-auto">
                  {service.location ? service.location : "Remote"}
                </p>
              </div>
              <div className="flex items-center mt-2">
                <CircleDollarSign />
                <p className="text-base ml-2 my-auto">
                  {formatted}
                  {service.service_type == "hourly" && " per hour"}
                </p>
              </div>

              <Button
                className="text-center w-1/2 mx-auto block mt-6 bg-black hover:bg-gray-800"
                onClick={() => {
                  router.push("/marketplace/service/" + service.id + "/order");
                }}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
          {primaryCampaign && (
            <Card className="max-w-md mx-auto mt-7">
              <CardContent className="p-5">
                {" "}
                <p className="-mb-2 font-semibold text-xl">
                  {primaryCampaign.title}
                </p>
                <Progress
                  value={(primaryCampaign.raised / primaryCampaign.goal) * 100}
                  className="h-3 my-4"
                />
                <p className="-mt-2 text-sm">
                  {formatDollarAmounts(
                    primaryCampaign.raised,
                    primaryCampaign.goal
                  )}
                </p>
                <p
                  className="text-right -mb-1 hover:underline text-blue-600 hover:cursor-pointer"
                  onClick={() => {
                    setCampaignDescription(true);
                  }}
                >
                  Learn More
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-3xl mt-5">About this Organization</h3>
          <div className="pt-6 flex items-center">
            <Avatar className="h-20 w-20">
              {pfp && <AvatarImage src={pfp} alt="pfp" />}
              <AvatarFallback>
                <UserRound className="p-1" />
              </AvatarFallback>
            </Avatar>
            <div className="ml-6">
              <h1 className="text-xl font-semibold">
                {service.organizations.name}
              </h1>
              <p className="my-1">
                {service.organizations.orders} orders completed
              </p>
            </div>
          </div>
          <Card className="p-5 my-6 mb-10">
            <p className=" text-base">{service.organizations.description}</p>
            <Separator orientation="horizontal" className="my-4" />
            <div className="flex space-x-20">
              <div>
                <h3 className="">From</h3>
                <p className="my-auto font-semibold">
                  {service.organizations.location}
                </p>
              </div>
              <div>
                <h3 className="">Member Since</h3>
                <p className="my-auto font-semibold">{date.toDateString()}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Example from "@/public/example.jpg";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { UserRound } from "lucide-react";
import { ServiceSearch } from "../types";

const emptyCampaign: Tables<"campaigns"> = {
  created_at: "",
  description: "",
  goal: 0,
  id: -1,
  raised: 0,
  title: "No Campaign",
};

function ServiceCard({ service }: { service: ServiceSearch }) {
  const organization = service.organizations;
  const campaign = organization.campaigns
    ? organization.campaigns
    : emptyCampaign;
  const supabase = createClient();
  const [thumbnail, setThumbnail] = useState("");
  const [pfp, setPfp] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  function formatDollarAmounts(amount: number, total: number) {
    const formattedAmount = Math.round(amount);
    const formattedTotal = Math.round(total);

    return `$${formattedAmount} out of $${formattedTotal}`;
  }

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
            .download(organization.id + "/" + pathPfp);
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
  const formatNumber = (num: number) => {
    if (num < 1000) {
      return num.toString(); // For numbers less than 1000, return as is.
    } else if (num < 1000000) {
      // For thousands, return with 'k'.
      return (num / 1000).toFixed(num % 1000 !== 0 ? 1 : 0) + "k";
    } else {
      // For millions, return with 'm'.
      return (num / 1000000).toFixed(num % 1000000 !== 0 ? 1 : 0) + "m";
    }
  };
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(service.price);
  return (
    <Card
      className="m-2 w-72 hover:cursor-pointer hover:scale-105 hover:animate-in scale-100 animate-out"
      onClick={() => {
        window.open("/marketplace/service/" + service.id, "_blank");
      }}
    >
      <div className="h-40 relative ">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={"thumbnail image"}
            layout="fill"
            objectFit="cover"
            onLoad={onImageLoad}
            className="rounded"
            style={{ display: loading ? "none" : "block" }}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="px-3 pt-2 font-semibold text-sm flex">
        <Avatar className="h-7 w-7">
          {pfp && <AvatarImage src={pfp} alt="pfp" />}
          <AvatarFallback>
            <UserRound className="p-1" />
          </AvatarFallback>
        </Avatar>
        <h3 className="my-auto ml-2">{service.organizations.name}</h3>
      </div>
      <div className="px-3 pt-2 pb-2">
        <p className="text-md">
          {service.title.substring(0, 50)} {service.title.length >= 50 && "..."}
        </p>
      </div>
      <div className="px-3 pb-2">
        <p className="text-md font-bold">
          {formatted}
          <span className="text-xs font-normal">
            {service.service_type == "hourly" && " per hour"}
          </span>
        </p>
        <p className="text-xs font-medium inline-block -mt-2">
          {formatNumber(service.orders)} orders
        </p>
      </div>

      <div className="px-3 pt-1 pb-2">
        <p className="text-xs pb-1 font-medium">
          {campaign.title.substring(0, 50)}{" "}
          {campaign.title.length >= 50 && "..."}
        </p>
        <Progress
          value={(campaign.raised / campaign.goal) * 100}
          className="h-2"
        />
        <p className="text-xs pt-1">
          {formatDollarAmounts(campaign.raised, campaign.goal)}{" "}
        </p>
      </div>
    </Card>
  );
}

export default ServiceCard;

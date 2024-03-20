import { redirect } from "next/navigation";
import Marketplace from "./_components/Marketplace";

import React from "react";

import { createClient } from "@/utils/supabase/server";
import {
  searchServices,
  searchServicesNearby,
  searchServicesRemote,
} from "@/utils/functions/services/serviceQuery";

export default async function MarketplacePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (!("search" in searchParams)) {
    redirect("/");
  } else {
    if ("radius" in searchParams) {
      if (searchParams.radius != "remote") {
        const tickets = await searchServicesNearby(
          searchParams.search as string,
          searchParams.radius as string,
          searchParams.lat as string,
          searchParams.long as string
        );

        return (
          <Marketplace
            user={user.data.user}
            searchParams={searchParams}
            filterParamsLocation={searchParams.localName as string}
            filterParamsRadius={searchParams.radius as string}
            initialTickets={tickets ? tickets : []}
          />
        );
      } else {
        const tickets = await searchServicesRemote(
          searchParams.search as string
        );
        return (
          <Marketplace
            user={user.data.user}
            searchParams={searchParams}
            filterParamsLocation={searchParams.localName as string}
            filterParamsRadius={searchParams.radius as string}
            initialTickets={tickets ? tickets : []}
          />
        );
      }
    }

    const tickets = await searchServices(searchParams.search as string);
    return (
      <Marketplace
        user={user.data.user}
        searchParams={searchParams}
        filterParamsLocation={null}
        filterParamsRadius={null}
        initialTickets={tickets ? tickets : []}
      />
    );
  }
}

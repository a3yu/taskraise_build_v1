"use server";

import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { OrderWithMessages } from "@/app/(organization)/dashboard/orders/[id]/types";

export async function getOrderWithMessages(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("service_orders")
    .select(
      `*,
      profiles(*),
      organizations(*, campaigns(*)),
      services (*),
     messages(*)`
    )
    .eq("id", id)
    .returns<OrderWithMessages[]>();

  if (error) throw error;

  return data;
}

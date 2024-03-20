"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { serviceSchema } from "./serviceSchema";

export async function createService(
  organization: number,
  values: z.infer<typeof serviceSchema>
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("services")
    .insert({
      organization,
      title: values.title,
      description: values.description,
      thumbnail_path: organization + "/" + values.thumbnail_path,
      price: values.price,
      location: values.location != "" ? values.location : null,
      location_geo: values.location_geo != "" ? values.location_geo : null,
      service_details: values.service_details,
      order_details: values.order_details,
    })
    .select("*")
    .single();
  if (error) {
    throw error;
  }
  return data;
}

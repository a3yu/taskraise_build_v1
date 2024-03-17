"use server";

import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export async function addCampaign(
  goal: number,
  title: string,
  description: string,
  organization: number
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("campaigns")
    .upsert({ goal, title, description, id: organization, raised: 0 })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

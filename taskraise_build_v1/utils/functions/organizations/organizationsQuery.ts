"use server";

import { createClient } from "@/utils/supabase/server";

export async function getOrganizationAll(id: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("organizations")
    .select(
      `
  *,
  service_orders (*, services(*)),
  campaigns (*)
`
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

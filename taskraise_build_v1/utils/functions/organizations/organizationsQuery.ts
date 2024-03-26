"use server";

import { createClient } from "@/utils/supabase/server";

export async function getOrganizationAll(id: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("organizations")
    .select(
      `
  *,
  service_orders (*, services(*), profiles(*)),
  campaigns (*),
  activities (*, profiles(*)),
  organization_members (*, profiles(*)),
  services (*)
`
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function getOrganizationById(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("organization_members")
    .select("*")
    .eq("profile", id);

  if (error) throw error;

  return data;
}

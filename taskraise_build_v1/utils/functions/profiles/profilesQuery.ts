import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/types/supabase";

export async function getProfile() {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error("User not found");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.data.user.id)
    .single();

  if (error) throw error;

  return data;
}

export async function getProfileOrganization() {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error("User not found");

  const { data, error } = await supabase
    .from("profiles")
    .select(`organization_members (id)`)
    .eq("id", user.data.user.id)
    .limit(1)
    .single();

  if (error) throw error;

  return data;
}

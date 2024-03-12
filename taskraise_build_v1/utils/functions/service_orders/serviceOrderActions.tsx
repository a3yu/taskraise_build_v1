"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export async function acceptOrder(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("service_orders")
    .update({ status: "ONGOING" })
    .eq("id", id)
    .select("*, services(*), profiles(*)")
    .single();
  if (error || data == null) {
    throw error;
  }
  return data;
}

export async function rejectOrder(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("service_orders")
    .update({ status: "REJECTED" })
    .eq("id", id)
    .select("*, services(*), profiles(*)")
    .single();
  if (error || data == null) {
    throw error;
  }
  return data;
}

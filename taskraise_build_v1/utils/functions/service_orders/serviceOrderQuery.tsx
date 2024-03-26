"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { capturePaymentIntent, denyPaymentIntent } from "../stripe/stripe";
import { OrderWithOrganization } from "@/app/(customer)/orders/type";

export async function getCustomerOrders(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("service_orders")
    .select("*, organizations(*, campaigns(*))")
    .eq("customer", id)
    .returns<OrderWithOrganization[]>();

  if (error || data == null) {
    throw error;
  }
  return data;
}

export async function getCustomerOrder(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("service_orders")
    .select("*, organizations(*, campaigns(*)), messages(*)")
    .eq("id", id)
    .returns<OrderWithOrganization>();

  if (error || data == null) {
    throw error;
  }
  return data;
}

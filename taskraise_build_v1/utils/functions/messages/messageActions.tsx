"use server";

import { createClient } from "@/utils/supabase/server";

export async function insertMessage(
  id: number,
  customer: string,
  order: number,
  message: string,
  to_customer: boolean
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("messages")
    .insert({ organization: id, customer, order, message, to_customer })
    .select("*");
  console.log(data);
  return data;
}

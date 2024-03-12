import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns";

const token = uuidv4();

export async function getOrganizationAll(email: string, organization: number) {
  const supabase = createClient();
  const expirationDate = add(new Date(), { weeks: 2 });

  const { data, error } = await supabase.from("invitations").insert({
    token: token,
    email: email,
    organization_id: organization,
    expires_at: expirationDate.toISOString(),
  });

  if (error) throw error;

  return data;
}

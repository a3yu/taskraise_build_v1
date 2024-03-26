import { Tables } from "@/types/supabase";

export type OrderWithOrganization = Tables<"service_orders"> & {
  organizations: Tables<"organizations">;
};

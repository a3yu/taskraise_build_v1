import { Tables } from "@/types/supabase";

export type OrderWithMessages = Tables<"service_orders"> & {
  organizations: Tables<"organizations"> & {
    campaigns: Tables<"campaigns"> | null;
  };
  services: Tables<"services">;
  profiles: Tables<"profiles">;
  messages: Tables<"messages">[];
};

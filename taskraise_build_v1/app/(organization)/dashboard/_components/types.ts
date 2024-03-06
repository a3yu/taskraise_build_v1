import { Tables } from "@/types/supabase";

export type ServiceOrderWithService = Tables<"service_orders"> & {
  services: Tables<"services"> | null;
};

export type OrganizationData = Tables<"organizations"> & {
  campaigns: Tables<"campaigns">[];
  service_orders: ServiceOrderWithService[];
};

import { Tables } from "@/types/supabase";

export type ServiceSearch = Tables<"services"> & {
  organizations: OrganizationWithCampaign;
};

export type OrganizationWithCampaign = Tables<"organizations"> & {
  campaigns: Tables<"campaigns"> | null;
};

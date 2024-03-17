import { Tables } from "@/types/supabase";

export type ServiceOrderWithService = Tables<"service_orders"> & {
  services: Tables<"services"> | null;
  profiles: Tables<"profiles"> | null;
};

export type OrganizationData = Tables<"organizations"> & {
  campaigns: Tables<"campaigns"> | null;
  activities: ActivityWithProfile[];
  services: Tables<"services">[];
  service_orders: ServiceOrderWithService[];
  organization_members: MembersWithProfile[];
};

export type ActivityWithProfile = Tables<"activities"> & {
  profiles: Tables<"profiles"> | null;
};

export type MembersWithProfile = Tables<"organization_members"> & {
  profiles: Tables<"profiles"> | null;
};

export type ProfileWithMember = Tables<"profiles"> & {
  organization_members: Tables<"organization_members">[];
};

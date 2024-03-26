import { Tables } from "@/types/supabase";

export type ServiceSearch = Tables<"services"> & {
  organizations: OrganizationWithCampaign;
};

export type OrganizationWithCampaign = Tables<"organizations"> & {
  campaigns: Tables<"campaigns"> | null;
};

export type InvitationWithOrganization = Tables<"invitations"> & {
  organizations: Tables<"organizations"> | null;
};
export type ProfileWithOrganization = Tables<"profiles"> & {
  organization_members: Tables<"organization_members">[];
  invitations: InvitationWithOrganization[];
};

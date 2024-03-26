import { Database } from "@/types/supabase";

import { cookies } from "next/headers";
import HomePage from "./_components/Home";
import { createClient } from "@/utils/supabase/server";
import { getProfile } from "@/utils/functions/profiles/profilesQuery";
export default async function Home() {
  const profile = await getProfile();

  return (
    <div className="flex min-h-screen flex-col ">
      <HomePage profile={profile} />
    </div>
  );
}

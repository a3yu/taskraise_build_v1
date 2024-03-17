import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const next = searchParams.get("next") ?? "/";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");

  if (token_hash) {
    const supabase = createClient();
    const { data: invitation, error } = await supabase
      .from("invitations")
      .select("*")
      .eq("token", token_hash)
      .single();
    if (invitation) {
      if (new Date(invitation.expires_at) > new Date()) {
        const { error } = await supabase
          .from("invitations")
          .update({ accepted: true })
          .eq("id", invitation.id);
        console.log(error);
        if (error) {
          redirectTo.pathname = "/error";
          return NextResponse.redirect(redirectTo);
        }
        redirectTo.pathname = "/dashboard";
        return NextResponse.redirect(redirectTo);
      }
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = "/error";
  return NextResponse.redirect(redirectTo);
}

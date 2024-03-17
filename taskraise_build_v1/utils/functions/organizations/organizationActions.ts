"use server";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns";
import { Resend } from "resend";

export async function inviteUser(email: string, organization: number) {
  const supabase = createClient();
  const token = uuidv4();
  const resend = new Resend(process.env.NEXT_RESEND_PUBLIC_KEY as string);

  const expirationDate = add(new Date(), { weeks: 2 });

  const { data: userData, error: userError } = await supabase
    .from("profiles") // Adjust the table name as per your schema
    .select("*")
    .eq("email", email)
    .single(); // Assuming email is unique and you're expecting one result

  if (userError) throw new Error("There are no users with this email.");

  const { data, error } = await supabase.from("invitations").insert({
    token,
    email,
    organization,
    profile: userData.id,
    expires_at: expirationDate.toISOString(),
  });

  if (error) throw error;

  // Send invitation email
  await resend.emails.send({
    from: "no-reply@taskraise.com",
    to: email,
    subject: "Organization Invite - TaskRaise",
    html: `<p>You have been invited to join an organization on TaskRaise.</p>
             <p>Please click the link below to accept the invitation:</p>
             <a href="http://localhost:3000/invite?token_hash=${token}">Accept Invitation</a>
             <p>This invitation will expire on ${expirationDate.toLocaleDateString()}.</p>`,
  });
}

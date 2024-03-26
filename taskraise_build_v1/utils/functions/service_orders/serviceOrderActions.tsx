"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  capturePaymentIntent,
  denyPaymentIntent,
  transferToConnectedAccount,
} from "../stripe/stripe";
import { OrderWithMessages } from "@/app/(organization)/dashboard/orders/[id]/types";
import { Resend } from "resend";

export async function acceptOrder(id: number, paymentIntent: string) {
  const resend = new Resend(process.env.NEXT_RESEND_PUBLIC_KEY as string);

  const supabase = createClient();
  const { data, error } = await supabase
    .from("service_orders")
    .update({ status: "ONGOING" })
    .eq("id", id)
    .select("*, services(*), profiles(*)")
    .single();
  await capturePaymentIntent(paymentIntent);

  if (error || data == null) {
    throw error;
  }
  if (data.profiles?.email && data.services) {
    await resend.emails.send({
      from: "no-reply@taskraise.com",
      to: data.profiles.email,
      subject: "Service Order Confirmation - TaskRaise",
      html: `<p>Your service order has been accepted and is now in progress.</p>
             <p>Order Details:</p>
             <ul>
               <li>Service Name: ${data.services.title}</li>
               <li>Order ID: ${data.id}</li>
               <li>Status: Ongoing</li>
             </ul>
             <p>You can view the status of your order and manage it by logging into your TaskRaise account.</p>
             <a href="http://localhost:3000/orders/${data.id}">View Order</a>`,
    });
  }

  return data;
}

export async function rejectOrder(id: number, paymentIntent: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("service_orders")
    .update({ status: "REJECTED" })
    .eq("id", id)
    .select("*, services(*), profiles(*)")
    .single();
  await denyPaymentIntent(paymentIntent);

  if (error || data == null) {
    throw error;
  }
  return data;
}

export async function completeOrder(order: OrderWithMessages) {
  const supabase = createClient();
  const date = new Date();
  await supabase
    .from("service_orders")
    .update({ status: "COMPLETED", completed_at: date.toISOString() })
    .eq("id", order.id);
  await transferToConnectedAccount(
    order.organizations.connected_account,
    order.price,
    order.payment_intent
  );
  await supabase.rpc("increment_order_count", {
    service_id: order.services.id,
  });
  console.log("increment");
  if (order.organizations.campaigns) {
    await supabase.rpc("increase_raised_amount", {
      campaign_id: order.organizations.campaigns.id,
      amount_to_add: order.price,
    });
    console.log("Campaign raised amount increased");
  }
  const resend = new Resend(process.env.NEXT_RESEND_PUBLIC_KEY as string);
  await resend.emails.send({
    from: "no-reply@taskraise.com",
    to: order.organizations.email,
    subject: "Service Order Completion - TaskRaise",
    html: `<p>The service order (ID: ${order.id}) has been marked as completed by the customer.</p>
           <p>Thank you for partnering with TaskRaise to deliver impactful services.</p>`,
  });
  redirect("/orders");
}

export async function createOrder(email: string) {
  const resend = new Resend(process.env.NEXT_RESEND_PUBLIC_KEY as string);
  await resend.emails.send({
    from: "no-reply@taskraise.com",
    to: email, // Send email to the organization's email address
    subject: "New Service Order Received - TaskRaise",
    html: `<p>You have received a new service order.</p>
           <p>Please log in to your TaskRaise account to view and manage the order.</p>`,
  });
}

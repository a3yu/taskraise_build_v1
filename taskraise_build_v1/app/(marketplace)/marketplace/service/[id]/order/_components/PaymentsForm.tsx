"use client";

import type { StripeError } from "@stripe/stripe-js";

import * as React from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";

import * as config from "@/config";
import getStripe from "@/lib/getStripe";

import ServiceOrder from "./ServiceOrder";
import { Tables } from "@/types/supabase";
import { User } from "@supabase/supabase-js";
import { ServiceSearch } from "@/app/(marketplace)/marketplace/types";

export default function ElementsForm({
  profile,
  service,
}: {
  service: ServiceSearch;
  profile: Tables<"profiles">;
}): JSX.Element {
  return (
    <Elements
      stripe={getStripe()}
      options={{
        appearance: {
          variables: {
            colorIcon: "#6772e5",
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          },
        },
        currency: config.CURRENCY,
        capture_method: "manual",
        mode: "payment",

        amount: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
      }}
    >
      <ServiceOrder profile={profile} service={service} />
    </Elements>
  );
}

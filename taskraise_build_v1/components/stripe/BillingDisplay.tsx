"use client";
import React, { useState } from "react";
import { loadConnectAndInitialize } from "@stripe/connect-js";
import {
  ConnectPayments,
  ConnectPayouts,
  ConnectComponentsProvider,
  ConnectAccountOnboarding,
} from "@stripe/react-connect-js";
import { fetchClientSecretAccount } from "@/utils/functions/stripe/stripe";
import { Card, CardContent } from "../ui/card";

function BillingDisplay({ account }: { account: string }) {
  const [stripeConnectInstance] = useState(() => {
    const fetchClientSecret = async () => {
      const response = await fetchClientSecretAccount(account);
      if (!response) {
        return "";
      } else {
        return response.client_secret;
      }
    };
    return loadConnectAndInitialize({
      appearance: {
        variables: {
          colorPrimary: "#645CFF",
          fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
        },
      },
      publishableKey: process.env.NEXT_STRIPE_PUBLIC_KEY as string,
      fetchClientSecret: fetchClientSecret,
    });
  });
  if (stripeConnectInstance) {
    return (
      <>
        <CardContent className="font-sans">
          <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
            <div className="space-y-4">
              <ConnectPayouts />

              <ConnectPayments />
            </div>
          </ConnectComponentsProvider>
        </CardContent>
      </>
    );
  }
}

export default BillingDisplay;

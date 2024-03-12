import BillingDisplay from "@/components/stripe/BillingDisplay";
import React from "react";

function Billing() {
  return (
    <div>
      <BillingDisplay account={"acct_1OmKuIIobzE9Ed35"} />
    </div>
  );
}

export default Billing;

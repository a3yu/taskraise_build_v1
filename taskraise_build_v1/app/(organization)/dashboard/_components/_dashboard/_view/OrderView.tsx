import React, { useState } from "react";
import { CardContent, CardHeader } from "@/components/ui/card";
import NavigationBar from "./_orderView/NavigationBar";
import IncomingOrders from "./_orderView/_subviews/IncomingOrders";
import OngoingOrders from "./_orderView/_subviews/OngoingOrders";
import CompletedOrders from "./_orderView/_subviews/CompletedOrders";
import { ServiceOrderWithService } from "../../types";
function OrderView({
  data,
  setData,
}: {
  data: ServiceOrderWithService[];
  setData: React.Dispatch<React.SetStateAction<ServiceOrderWithService[]>>;
}) {
  const subviews = ["Incoming", "Ongoing", "Completed"];
  const [currentPage, setPage] = useState(subviews[0]);

  const renderSubview = () => {
    switch (currentPage) {
      case "Incoming":
        return <IncomingOrders data={data} setData={setData} />;
      case "Ongoing":
        return <OngoingOrders data={data} setData={setData} />;
      case "Completed":
        return <CompletedOrders data={data} setData={setData} />;
      default:
        return <div>Unknown Page</div>;
    }
  };

  return (
    <>
      <CardHeader className="px-0">
        <div className="border-b">
          <div className="px-4">
            <NavigationBar
              pages={subviews}
              currentPage={currentPage}
              setPage={setPage}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>{renderSubview()}</CardContent>
    </>
  );
}

export default OrderView;

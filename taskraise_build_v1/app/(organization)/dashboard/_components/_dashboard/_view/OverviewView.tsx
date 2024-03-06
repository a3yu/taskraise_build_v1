import { CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import NavigationBar from "./_overviewView/NavigationBar";

function OverviewView() {
  const subviews = ["Services", "Organization", "Orders"];
  const [currentPage, setPage] = useState(subviews[0]);
  return (
    <>
      <CardHeader>
        <h2 className="text-2xl font-bold">Overview</h2>
        <div className="pt-4 border-b">
          <NavigationBar
            pages={subviews}
            currentPage={currentPage}
            setPage={setPage}
          />
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </>
  );
}

export default OverviewView;

import React, { useState } from "react";
import { OrganizationData, ServiceOrderWithService } from "../../types";
import { CardContent, CardHeader } from "@/components/ui/card";
import NavigationBar from "./_overviewView/NavigationBar";
import Overview from "./_overviewView/_subviews/Overview";
import Organization from "./_overviewView/_subviews/Organization";
import Billing from "./_overviewView/_subviews/Billing";

function OverviewView({
  organizationData,
  setOrganizationData,
}: {
  organizationData: OrganizationData;
  setOrganizationData: React.Dispatch<React.SetStateAction<OrganizationData>>;
}) {
  const subviews = ["Overview", "Organization", "Billing"];
  const [currentPage, setPage] = useState(subviews[0]);

  const renderSubview = () => {
    switch (currentPage) {
      case subviews[0]:
        return (
          <Overview
            organizationData={organizationData}
            setOrganizationData={setOrganizationData}
          />
        );
      case subviews[1]:
        return (
          <Organization
            organizationData={organizationData}
            setOrganizationData={setOrganizationData}
          />
        );
      case subviews[2]:
        return <Billing />;
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

export default OverviewView;

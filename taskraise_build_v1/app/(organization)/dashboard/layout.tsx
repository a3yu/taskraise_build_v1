import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import AuthGraphic from "@/public/graphics/AuthPageGraphic.svg";
import DashboardNavigationBar from "./_components/DashboardNavigationBar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data?.user) {
    redirect("/");
  }

  return (
    <div>
      <DashboardNavigationBar />
      <div className="px-20 py-12">{children}</div>
    </div>
  );
}

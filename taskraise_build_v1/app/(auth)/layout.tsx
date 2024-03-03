import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import AuthGraphic from "@/public/graphics/AuthPageGraphic.svg";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen">
      <div className="w-5/12 bg-[#f4f3f9] items-center p-14 justify-center hidden xl:flex">
        <Image src={AuthGraphic} alt="Graphic" />
      </div>
      <div className="w-full xl:w-7/12 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

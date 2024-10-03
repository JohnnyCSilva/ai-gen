import SideNav from "@/components/nav/sideNav";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex md:flex-row flex-col">
      <div className="hidden md:block w-1/5 md:border-r md:border-b-0 border-r border-b-1">
        <SideNav />
      </div>

      <div className="flex-1 overflow-y-scroll h-[900px]">{children}</div>
    </div>
  );
}

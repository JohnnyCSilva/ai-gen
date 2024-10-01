import SideNav from "@/components/ui/nav/sideNav";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="col-span-1">
        <SideNav />
      </div>

      <div className="col-span-1 md:col-span-3">{children}</div>
    </div>
  );
}

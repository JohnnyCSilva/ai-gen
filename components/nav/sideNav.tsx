"use client";

import { LayoutDashboard, FileClock, Wallet, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Usage from "@/components/nav/usage";
import { createCustomerPortalSession } from "@/actions/stripe";

import SignUpModal from "@/components/modal/signUpModal";

export default function sideNav() {
  const path = usePathname();
  const { theme } = useTheme();

  const handleClick = async () => {
    const response = await createCustomerPortalSession();

    window.location.href = response as string;
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      link: "/dashboard",
    },
    {
      name: "History",
      icon: <FileClock size={20} />,
      link: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: <Wallet size={20} />,
      onClick: handleClick,
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      link: "/dashboard/settings",
    },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-0 py-8 flex flex-col justify-center gap-2 w-full md:p-8">
        {menuItems.map((item, index) =>
          item.link ? (
            <Link key={index} href={item.link} className="w-full">
              <div
                className={`${
                  path === item.link ? "bg-accent" : "hover:bg-accent"
                } flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition w-full`}>
                {item.icon}
                <span className="inline">{item.name}</span>
              </div>
            </Link>
          ) : (
            <div
              key={index}
              onClick={item.onClick}
              className="flex items-center space-x-4 p-4 rounded-xl cursor-pointer hover:bg-accent transition w-full">
              {item.icon}
              <span className="inline">{item.name}</span>
            </div>
          )
        )}
      </div>

      <div className="p-0 md:p-8 mt-auto">
        <Usage />
        <SignUpModal />
      </div>
    </div>
  );
}

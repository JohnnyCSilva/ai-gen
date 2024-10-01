"use client";

import { LayoutDashboard, FileClock, Wallet, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes"; // Importa o hook useTheme

export default function sideNav() {
  const path = usePathname();
  const { theme } = useTheme(); // Obtém o tema atual (light ou dark)

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard />,
      link: "/dashboard",
    },
    {
      name: "History",
      icon: <FileClock />,
      link: "/dashboard/history",
    },
    {
      name: "Wallet",
      icon: <Wallet />,
      link: "/dashboard/billing",
    },
    {
      name: "Settings",
      icon: <Settings />,
      link: "/dashboard/settings",
    },
  ];

  return (
    <div className="h-fit p-8 shadow-sm border flex flex-row justify-center gap-2 w-full md:h-screen md:flex-col md:justify-left md:justify-start">
      {menuItems.map((item, index) => (
        <Link key={index} href={item.link} className="w-fit md:w-full">
          <div
            className={`${
              path === item.link
                ? theme === "dark"
                  ? "bg-white text-black"
                  : "bg-black text-white"
                : "hover:bg-gray-200/50"
            } flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition w-fit md:w-full`}>
            {item.icon}
            <span className="hidden md:inline">{item.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

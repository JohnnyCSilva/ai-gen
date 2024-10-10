"use client";

import React from "react";
import { Menu, Sparkles, Coins, LayoutDashboard } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUser } from "@clerk/nextjs";
import { useUsage } from "@/context/usage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModeToggler from "@/components/nav/modeToggler";

export default function MobileNav() {
  const { isSignedIn, user } = useUser();
  const { subscribed } = useUsage();
  const path = usePathname(); // Obter o caminho atual

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      link: "/dashboard",
    },
    {
      name: "Generative",
      icon: <Sparkles size={20} />,
      link: "/generative",
    },
    {
      name: "Membership",
      icon: <Coins size={20} />,
      link: "/membership",
    },
  ];

  return (
    <div>
      <Sheet>
        <SheetTrigger className="w-fit p-4 border flex gap-2 rounded-xl">
          <Menu size={18} />
        </SheetTrigger>

        <SheetContent side="left" className="w-[90%]">
          <div className="flex flex-col mt-8 space-y-4 p-0 py-8 md:p-8">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.link} className="w-full">
                <div
                  className={`${
                    path === item.link ? "bg-accent" : "hover:bg-accent"
                  } flex items-center gap-4 p-4 rounded-xl cursor-pointer transition w-full `}>
                  {item.icon}
                  <span className="inline">{item.name}</span>
                </div>
              </Link>
            ))}

            {/*<ModeToggler />*/}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

import React from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideNav from "@/components/nav/sideNav";

export default function MobileNav() {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="w-fit p-4 border flex gap-2 rounded-xl">
          <Menu size={24} />
        </SheetTrigger>

        <SheetContent side="left" className="w-[90%]">
          <SideNav />
        </SheetContent>
      </Sheet>
    </div>
  );
}

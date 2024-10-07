"use client";

import React from "react";
import { useUsage } from "@/context/usage";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Usage() {
  const { count, subscribed } = useUsage();

  const credits = Number(process.env.NEXT_PUBLIC_FREE_PLAN_USAGE);
  const percentage = (count / credits) * 100;

  return (
    <div className="m-2">
      <div className="rounded-xl shadow border p-4">
        <div className="font-medium flex w-full justify-between items-center">
          <h2 className=" text-ml"> Credits</h2>

          <h2 className="text-sm md:text-ml">
            {subscribed
              ? "Unlimited Credits"
              : `${count} / ${credits} credits used`}
          </h2>
        </div>

        <div className="h-2 bg-gray-700 w-full rounded-full mt-4 overflow-hidden">
          <div
            className="h-2 bg-slate-200 rounded-full"
            style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
      <Link href="/membership" className="w-full">
        <Button className="w-full mt-3 p-6 rounded-xl" variant="secondary">
          Upgrade
        </Button>
      </Link>
    </div>
  );
}

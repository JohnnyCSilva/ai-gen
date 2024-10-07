import React from "react";

import PlanCard from "@/components/plan/planCard";

export default function page() {
  return (
    <div className="flex flex-col items-center w-full h-screen p-4 md:p-24">
      <h1 className="text-5xl font-bold mb-8 md:mb-24 mt-8 md:mt-0 text-center">
        Upgrade your subscription
      </h1>

      <div className="flex justify-center align-center w-full flex-col md:flex-row">
        <PlanCard
          name="Free"
          image="/logo.png"
          price="Free"
          buttonVariant="secondary"
        />
        <PlanCard
          name="Monthly"
          image="/premium.png"
          price="9,99€"
          buttonVariant=""
        />
        <PlanCard
          name="Yearly"
          image="/premium.png"
          price="99,90€"
          buttonVariant="secondary"
        />
      </div>
    </div>
  );
}

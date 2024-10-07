import React from "react";

import { UserProfile } from "@clerk/nextjs";

export default function page() {
  return (
    <div className="p-8">
      <UserProfile />
    </div>
  );
}

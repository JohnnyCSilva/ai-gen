"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { usageCount } from "@/actions/ai";
import { useUser } from "@clerk/nextjs";

const UsageContext = createContext();

export const UsageProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [count, setCount] = useState(0);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
};

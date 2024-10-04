"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { usageCount } from "@/actions/ai";
import { useUser } from "@clerk/nextjs";

export interface UsageContextType {
  count: number;
  fetchUsage: () => Promise<void>;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  // states
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  // hooks
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    if (count > 10000) setOpenModal(true);
  }, [count]);

  useEffect(() => {
    if (email) fetchUsage();
  }, [email]);

  const fetchUsage = async () => {
    const res = await usageCount(email);
    setCount(res);
  };

  return (
    <UsageContext.Provider
      value={{ count, fetchUsage, openModal, setOpenModal }}>
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (!context) {
    throw new Error("useUsage must be used within a UsageProvider");
  }
  return context;
};

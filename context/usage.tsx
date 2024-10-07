"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { usageCount } from "@/actions/ai";
import { useUser } from "@clerk/nextjs";
import { checkSubscription } from "@/actions/stripe";

export interface UsageContextType {
  count: number;
  fetchUsage: () => Promise<void>;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  subscribed: boolean;
}

const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  // states
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  // hooks
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    if (
      !subscribed &&
      count > Number(process.env.NEXT_PUBLIC_FREE_PLAN_USAGE)
    ) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [count, subscribed]);

  useEffect(() => {
    if (email) {
      fetchUsage();
      fetchSubscription();
    }
  }, [email]);

  const fetchUsage = async () => {
    const res = await usageCount(email);
    setCount(res);
  };

  const fetchSubscription = async () => {
    const res = await checkSubscription();
    setSubscribed(res?.ok as boolean);
  };

  return (
    <UsageContext.Provider
      value={{ count, fetchUsage, openModal, setOpenModal, subscribed }}>
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

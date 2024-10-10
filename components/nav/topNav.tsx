"use client";

import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import ModeToggler from "@/components/nav/modeToggler";
import Link from "next/link";

import { useUsage } from "@/context/usage";
import MobileNav from "@/components/nav/mobileTopNav";

export default function topNav() {
  const { isSignedIn, user } = useUser();
  const { subscribed } = useUsage();

  return (
    <nav className="flex flex-row justify-between items-center p-8 shadow-sm border-b md:flex-row gap-2">
      <div className="md:hidden block">
        <MobileNav />
      </div>

      <Link href="/">
        <h2 className="font-bold md:text-2xl text-xl">Elysium AI</h2>
      </Link>

      <div className="space-x-4 hidden md:flex md:flex-row ">
        {isSignedIn && (
          <div className="flex space-x-4">
            <Link href="/dashboard" className="flex items-center">
              Dashboard
            </Link>
          </div>
        )}

        <Link href="/generative" className="flex items-center">
          Generative
        </Link>

        {!subscribed && (
          <Link href="/membership" className="flex items-center">
            Membership
          </Link>
        )}

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/*<ModeToggler />*/}
      </div>

      <div className="md:hidden block">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

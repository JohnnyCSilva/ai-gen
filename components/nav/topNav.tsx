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

export default function topNav() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="flex justify-between items-center p-8 shadow-sm border-b">
      <Link href="/">
        <h2 className="font-bold text-2xl">Elysium AI</h2>
      </Link>

      <div className="flex space-x-4">
        {isSignedIn && (
          <div className="flex space-x-4">
            <Link href="/dashboard" className="flex items-center">
              Dashboard
            </Link>
          </div>
        )}

        <Link href="/membership" className="flex items-center">
          Membership
        </Link>

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <ModeToggler />
      </div>
    </nav>
  );
}

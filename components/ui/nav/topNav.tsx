"use client";

import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import ModeToggler from "@/components/ui/nav/modeToggler";

import Link from "next/link";

export default function topNav() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="flex justify-between items-center p-8 shadow">
      <Link href="/">AI Gen</Link>

      <div className="flex space-x-4">
        {isSignedIn && (
          <div className="flex space-x-4">
            <Link href="/dashboard" className="flex items-center">
              Dashboard
            </Link>
            <Link href="/about" className="flex items-center">
              About
            </Link>
            <Link href="/contact" className="flex items-center">
              Contact
            </Link>
          </div>
        )}

        <Link href="/pricing" className="flex items-center">
          Pricing
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

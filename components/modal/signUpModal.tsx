"use client";

import React from "react";
import { useUsage } from "@/context/usage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpModal() {
  const { openModal, setOpenModal } = useUsage();

  return (
    <Dialog
      open={openModal}
      onOpenChange={() =>
        openModal ? setOpenModal(!openModal) : setOpenModal(openModal)
      }>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-xl">🚀 Unlock unlimited AI-Powered content</h2>
          </DialogTitle>
          <br />
          <DialogDescription>
            <div className="flex flex-col gap-4 text-lg mt-5 w-full">
              <p>
                You have reached your monthly limit of AI-Powered content. Sign
                up to unlock unlimited access.
              </p>
              <p>
                Ready to take your content creation to the next level? Upgrade
                to a paid plan and enjoy.
              </p>

              <ul className="m-5">
                <li>➡️ Unlimited AI-Powered generated content</li>
                <li>➡️ Advanced AI features</li>
                <li>➡️ Access to our last generation AI Model</li>
                <li>➡️ Priority support</li>
                <li>➡️ Faster processing times</li>
              </ul>

              <p>
                Dont let your creativity hit a wall. Upgrade now and unlock your
                full potential.
              </p>

              <div className="flex flex-row gap-2 w-full justify-between mt-5 items-center">
                <h2 className="text-xl text-white">🔥 9.99€ /month</h2>

                <Link href="/membership" className="w-fit">
                  <Button className="w-[200px] py-6 flex gap-2 rounded-xl">
                    Upgrade Now
                  </Button>
                </Link>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

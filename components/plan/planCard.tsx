"use client";

import React from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SignInButton, useUser } from "@clerk/nextjs";

import { useRouter } from "next/navigation";

export interface PlanCardProps {
  name: string;
  image: string;
  price: string;
  buttonVariant: string;
}

import { createCheckoutSession } from "@/actions/stripe";

export default function PlanCard(props: PlanCardProps) {
  const { toast } = useToast();
  const { isSignedIn, isLoaded } = useUser();

  const router = useRouter();

  const handleCheckout = async () => {
    if (props.name === "Free") {
      router.push("/dashboard");
      return;
    } else if (props.name === "Yearly") {
      toast({
        description: "Please contact us to upgrade to the yearly plan",
      });
      return;
    } else {
      try {
        const response = await createCheckoutSession();

        const { url, error } = response;

        if (error) {
          toast({
            description: error,
          });
          return;
        }

        if (url) {
          router.push(url);
        }
      } catch (error: any) {
        toast({
          description: "An error occurred. Please try again later.",
        });
        console.log(error);
      }
    }
  };

  return (
    <div
      className={`max-w-sm shadow h-fit rounded-xl border p-8 m-6 ${
        props.name === "Monthly"
          ? "bg-gradient-to-br from-[#212727] via-[#111111] to-[#09090b] scale-110"
          : "bg-[#09090b]"
      }`}>
      <div className="flex justify-start items-center gap-2">
        <Image src={props.image} width={25} height={25} alt="Plan" />
        <h2 className="text-xl text-bold">{props.name} Plan</h2>
      </div>
      <p className="text-gray-500 my-4">
        Create a free account to use our special models
      </p>

      <h1 className="text-5xl font-bold text-left mt-12">
        {props.price}{" "}
        {props.name === "Monthly" ? (
          <span className="text-2xl text-gray-500"> /month</span>
        ) : (
          ""
        )}{" "}
        {props.name === "Yearly" ? (
          <span className="text-2xl text-gray-500"> /year</span>
        ) : (
          ""
        )}
      </h1>

      <hr className="my-8 bg-gray-900" />

      <p className="text-white mb-2">Benefits & Features</p>

      <ul className="m-2 text-gray-500">
        {props.name === "Free" ? (
          <li>- Limited AI-Powered generated content</li>
        ) : (
          ""
        )}
        {props.name !== "Free" ? (
          <li>- Unlimited AI-Powered generated content</li>
        ) : (
          ""
        )}
        {props.name !== "Free" ? <li>- Access to all AI Models</li> : ""}
        {props.name !== "Free" ? <li>- Priority Support</li> : ""}
        {props.name === "Yearly" ? <li>- 2 Months Free</li> : ""}
        <li>- Access to all AI Models</li>
        <li>- Priority Support</li>

        <li>- Advanced AI features</li>
        <li>- Faster processing times</li>
      </ul>

      {!isLoaded ? (
        ""
      ) : !isSignedIn ? (
        <Button
          variant="outline"
          className="w-full mt-10 py-6 flex gap-2 rounded-xl">
          <SignInButton />
        </Button>
      ) : (
        <Button
          onClick={handleCheckout}
          //variant={props.buttonVariant}
          className="w-full mt-10 py-6 flex gap-2 rounded-xl">
          {props.name === "Free"
            ? "Go to Dashboard"
            : props.name === "Monthly"
            ? "Upgrade to Monthly"
            : "Contact Us"}
        </Button>
      )}
    </div>
  );
}

"use server";

import { currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import Transaction from "@/models/transaction";

import stripe from "@/utils/stripe";

interface CheckoutSessionResponse {
  url?: string;
  error?: string;
}

export async function createCheckoutSession(): Promise<CheckoutSessionResponse> {
  const user = await currentUser();
  const customerEmail = user?.primaryEmailAddress?.emailAddress;

  if (!customerEmail) {
    return { error: "No customer email found" };
  }

  try {
    await db();
    const existingTransaction = await Transaction.findOne({ customerEmail });

    if (existingTransaction) {
      //retrieve the customer susbscription from stripe
      const subscriptions = await stripe.subscriptions.list({
        customer: existingTransaction.customerId,
        status: "all",
        limit: 1,
      });

      //check if any subscription is active
      const currentSubscription = subscriptions.data.find(
        (sub) => sub.status === "active"
      );

      if (currentSubscription) {
        return { error: "You already have an active subscription" };
      }
    }

    //if payment is monthly create a monthly subscription
    const sessionPaymentMonthly = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: customerEmail,
      line_items: [
        {
          price: process.env.STRIPE_MONTHLY_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/membership`,
    });

    return { url: sessionPaymentMonthly.url ?? undefined };
  } catch (error: any) {
    console.log(error.message);
    return { error: "Error creating Stripe Checkout Session" };
  }
}

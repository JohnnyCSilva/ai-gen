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
    console.log(error);
    return { error: "Error creating Stripe Checkout Session" };
  }
}

export async function checkSubscription() {
  const user = await currentUser();
  const customerEmail = user?.primaryEmailAddress?.emailAddress;

  try {
    const transaction = await Transaction.findOne({
      customerEmail,
      status: "complete",
    });

    if (transaction && transaction.subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(
        transaction.subscriptionId
      );

      if (subscription.status === "active") {
        return { ok: true };
      } else {
        return { ok: false };
      }
    }
  } catch (error: any) {
    console.log(error);
    return { error: "Error checking subscription" };
  }
}

export async function createCustomerPortalSession() {
  const user = await currentUser();
  const customerEmail = user?.primaryEmailAddress?.emailAddress;

  if (!customerEmail) {
    return { error: "No customer email found" };
  }

  try {
    await db();
    const existingTransaction = await Transaction.findOne({ customerEmail });

    if (!existingTransaction) {
      return { error: "No transaction found" };
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: existingTransaction.customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    });

    return portalSession.url ?? `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

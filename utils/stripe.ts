import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("Stripe secret key not found");
}

const stripe = new Stripe(secretKey as string);

export default stripe;

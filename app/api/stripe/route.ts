import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils"; // for redirecting to correct url

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth(); // get the user id
    const user = await currentUser(); // get the current user object

    // if no user id or no user, give unauthorized error
    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // find the subscription
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    // if user has subscription , redirect to billing portal to see more details
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl, // for redirecting the user back
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    // if user first time subscribing
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,

      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Genie Pro",
              description: "Create Genie AI Companions",
            },
            unit_amount: 999,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

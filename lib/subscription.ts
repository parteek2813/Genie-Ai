import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  // if no user id, sub invaild
  if (!userId) {
    return false;
  }

  // fetch the subscription
  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  // if no usersubscription
  if (!userSubscription) {
    return false;
  }

  // check if subscription present is still active or not
  // one day grace period added in form of DAY_IN_MS

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid; // for converting the isValid to boolean , use double !!
};

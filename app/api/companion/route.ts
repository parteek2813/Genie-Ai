import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    // if no user in the clerk
    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    // if no fields from body APi is missing
    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse("Pro Subscription required", { status: 403 });
    }

    // if user is there and all fields are also present , then
    // just create a new companion in the prismaDb and then return it

    const companion = await prismadb.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

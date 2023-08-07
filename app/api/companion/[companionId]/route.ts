import prismadb from "@/lib/prismadb";

import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    console.log("reaching");
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    console.log("after the patch request");

    // check if we have the companionId in params or not
    if (!params.companionId) {
      return new NextResponse("Companion Id is required", { status: 400 });
    }

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

    // TODO: Check for subsription

    // if user is there and all fields are also present , then
    // just create a new companion in the prismaDb and then return it

    const companion = await prismadb.companion.update({
      where: {
        id: params.companionId,
      },
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
    console.log("[COMPANION_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

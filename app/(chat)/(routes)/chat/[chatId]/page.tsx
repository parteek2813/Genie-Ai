import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { ChatClient } from "./components/client";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

// searchParams stores the name? : part
// params: stores the dynamic part of id

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const { userId } = auth();

  // if no userId is found, then redirect
  if (!userId) {
    return redirectToSignIn();
  }

  // here, means user found
  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      // order by the messages in the ascending order
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId, // only load the companion of the current User Id
        },
      },
      _count: {
        select: {
          messages: true, // display the messages too for this user
        },
      },
    },
  });

  // if still no companion, redirect
  if (!companion) {
    return redirect("/");
  }

  return <ChatClient companion={companion} />;
};

export default ChatIdPage;

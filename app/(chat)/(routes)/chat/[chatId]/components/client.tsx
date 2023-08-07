"use client";

import { Companion, Message } from "@prisma/client";

interface ChatClientPageProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const ChatClient = ({ companion }: ChatClientPageProps) => {
  return <div>Chat id client</div>;
};

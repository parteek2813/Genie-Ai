"use client";

import { Menu, Sparkle } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import MobileSidebar from "./MobileSidebar";
import { useProModal } from "@/Hooks/use-pro-modal";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

interface NavBarProps {
  isPro: boolean;
}

export const Navbar = ({ isPro }: NavBarProps) => {
  const proModel = useProModal();

  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/">
          <h1
            className={cn(
              "hidden md:block text-xl md:text-3xl font-bold text-primary",
              font.className // dynamic class name
            )}
          >
            genie.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        {!isPro && (
          <Button onClick={proModel.onOpen} variant="premium" size="sm">
            Upgrade
            <Sparkle className="h-4 w-4 fill-white text-white ml-2" />
          </Button>
        )}
        <UserButton afterSignOutUrl="/" />
        <ModeToggle />
      </div>
    </div>
  );
};

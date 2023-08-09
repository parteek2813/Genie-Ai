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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

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
        <MobileSidebar isPro={isPro} />
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
          <>
            <Popover>
              <PopoverTrigger>Get card info</PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-4">
                    Fill this info to get Genie pro! <br /> <br /> Or fill out
                    any random details with same card and expiry details
                  </p>

                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width">Card No</Label>
                      <Input
                        disabled={true}
                        id="width"
                        defaultValue="4242-4242-4242-4242"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxWidth">Expiry</Label>
                      <Input
                        disabled={true}
                        id="maxWidth"
                        defaultValue="05/55"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="height">CVC</Label>
                      <Input
                        disabled={true}
                        id="height"
                        defaultValue="555"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxHeight">Address </Label>
                      <Input
                        disabled={true}
                        id="maxHeight"
                        defaultValue="Address"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxHeight">Country</Label>
                      <Input
                        disabled={true}
                        id="maxHeight"
                        defaultValue="United States"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxHeight">City</Label>
                      <Input
                        disabled={true}
                        id="maxHeight"
                        defaultValue="City"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxHeight">State</Label>
                      <Input
                        disabled={true}
                        id="maxHeight"
                        defaultValue="California"
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxHeight">Pincode</Label>
                      <Input
                        disabled={true}
                        id="maxHeight"
                        defaultValue="123456"
                        className="col-span-2 h-8"
                      />
                    </div>
                  </div>
                </div>
                {/* bottom */}
              </PopoverContent>
            </Popover>
            <Button
              className="ml-5"
              onClick={proModel.onOpen}
              variant="premium"
              size="sm"
            >
              Upgrade
              <Sparkle className="h-4 w-4 fill-white text-white ml-2" />
            </Button>
          </>
        )}
        <UserButton afterSignOutUrl="/" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>Mode</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchInput() {
  return (
    <div className="relative ">
      <Search className="absolute h-4 w-4 top-3 left-4 to-muted-foreground" />
      <Input placeholder="Search..." className="pl-10 bg-primary/10 " />
    </div>
  );
}

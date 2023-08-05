"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/Hooks/use-debounce";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");

  const [value, setValue] = useState(name || "");
  const debouncedValue = useDebounce<string>(value, 500);

  return (
    <div className="relative ">
      <Search className="absolute h-4 w-4 top-3 left-4 to-muted-foreground" />
      <Input placeholder="Search..." className="pl-10 bg-primary/10 " />
    </div>
  );
}

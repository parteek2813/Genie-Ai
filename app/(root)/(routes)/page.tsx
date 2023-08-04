import React from "react";
import { UserButton } from "@clerk/nextjs";

export default function InsideRoute() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

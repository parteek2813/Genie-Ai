import React from "react";
import SearchInput from "@/components/search-input";
import prismadb from "@/lib/prismadb";
import { Categories } from "@/components/Categories";
import { Companions } from "@/components/Companions";

// We wanna get the searchParams come after searching... the naming is strict here
interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

export default async function InsideRoute({ searchParams }: RootPageProps) {
  // extract the companion based on search parameters category id
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      // show all messages to the user regardless of which user logged in
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });
  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
}

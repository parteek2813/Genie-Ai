import { Categories } from "@/components/Categories";
import prismadb from "@/lib/prismadb";
import CompanionForm from "./components/companion-form";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionId = async ({ params }: CompanionIdPageProps) => {
  // TODO: Check Subscription

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <>
      <CompanionForm initialData={companion} categories={categories} />
    </>
  );
};

// Flow:
// Fetched the companions and categories from the prisma db and
// then passed into the companionForm component
// This companion form component uses this category array and map
// over to give the select a category features in the create companion
// page altogether

export default CompanionId;

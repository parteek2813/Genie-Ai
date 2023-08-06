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

  console.log(categories);
  console.log(companion);
  return (
    <>
      <CompanionForm initialData={companion} categories={categories} />
    </>
  );
};

export default CompanionId;

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

  const category = await prismadb.category.findMany({
    where: {
      id: params.companionId,
    },
  });
  return (
    <>
      <CompanionForm initialData={companion} categories={Categories} />
    </>
  );
};

export default CompanionId;

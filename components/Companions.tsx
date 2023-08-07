import { Companion } from "@prisma/client";

interface CompanionProps {
  // created a array of companion model from prisma
  data: (Companion & {
    _count: {
      messages: number;
    };
  })[];
}

export const Companions = ({ data }: CompanionProps) => {
  // if no companions on searching
  if (data.length === 0) {
    <div className="pt-10 flex flex-col items-center justify-center space-y-3">
      <div className="relative"></div>
    </div>;
  }
  return (
    <>
      <div>Companions</div>
      <h2>Hello</h2>
    </>
  );
};

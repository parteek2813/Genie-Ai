import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="h-full p-4 space-y-4 flex flex-col items-center  ml-40% min-h-screen">
      <h3 className="text-lg font-medium ">Settings</h3>

      <div className="text-muted-foreground text-sm ">
        {isPro
          ? "You are currently on a Pro plan."
          : "You are currently on a free plan."}
      </div>

      <SubscriptionButton isPro={isPro} />

      {!isPro && (
        <Table className=" mt-[328px]">
          <TableCaption>Dummy Details to get your subscription.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Card Number</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>CVC</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Address Line 1 & 2</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Pincode</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">4242-4242-4242-4242</TableCell>
              <TableCell>05/55</TableCell>
              <TableCell>555</TableCell>
              <TableCell>[Any random]</TableCell>
              <TableCell>United States</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>California</TableCell>
              <TableCell>123456</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default SettingsPage;

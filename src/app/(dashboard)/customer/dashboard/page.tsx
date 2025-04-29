import ActionlessAreaChart from "@/components/charts/actionless-area-chart";
import { Card } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";
import OrderStatus from "@/components/OrderStatus";

// Remove the Props type and don't accept props in the page component
export default function CustomerDashboardPage() {
  return (
    <>
      <Card className="py-6 lg:h-44 grid grid-cols-1 lg:grid-cols-3">
        <div className="px-6">
          <div className="flex items-center pr-2.5">
            <IndianRupee className="w-7 h-7 text-icon" />
            <p className="text-lg font-semibold">Your Orders</p>
          </div>

          <div className="flex items-end justify-between">
            <div className="">
              <h6 className="text-sm font-semibold">$45k+</h6>
              <p className="text-sm text-secondary-foreground">20% Increase</p>
            </div>

            <div className="max-w-[150px] h-[100px] w-full">
              <ActionlessAreaChart
                height={110}
                colors={["hsl(var(--primary))"]}
                chartCategories={[
                  "Sat",
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                ]}
                chartSeries={[
                  { name: "Tasks", data: [0, 60, 90, 80, 100, 70, 80] },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="px-6 border-x border-border">
          <div className="flex items-center pr-2.5">
            <IndianRupee className="w-7 h-7 text-icon" />
            <p className="text-lg font-semibold">Total Spent</p>
          </div>

          <div className="flex items-end justify-between">
            <div className="">
              <h6 className="text-sm font-semibold">$45k+</h6>
              <p className="text-sm text-secondary-foreground">20% Increase</p>
            </div>

            <div className="max-w-[150px] h-[100px] w-full">
              <ActionlessAreaChart
                height={110}
                colors={["hsl(var(--primary))"]}
                chartCategories={[
                  "Sat",
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                ]}
                chartSeries={[
                  { name: "Tasks", data: [0, 60, 90, 80, 100, 70, 80] },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="px-6">
          <div className="flex items-center pr-2.5">
            <IndianRupee className="w-7 h-7 text-icon" />
            <p className="text-lg font-semibold">Favorite Items</p>
          </div>

          <div className="flex items-end justify-between">
            <div className="">
              <h6 className="text-sm font-semibold">$45k+</h6>
              <p className="text-sm text-secondary-foreground">20% Increase</p>
            </div>

            <div className="max-w-[150px] h-[100px] w-full">
              <ActionlessAreaChart
                height={110}
                colors={["hsl(var(--primary))"]}
                chartCategories={[
                  "Sat",
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                ]}
                chartSeries={[
                  { name: "Tasks", data: [0, 60, 90, 80, 100, 70, 80] },
                ]}
              />
            </div>
          </div>
        </div>
      </Card>
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-3"> Your Order Status</h1>
        <OrderStatus />
      </div>
    </>
  );
}

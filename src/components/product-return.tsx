import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { DivProps } from "react-html-props";
import { Button } from "@/components/ui/button";
import LineChart from "./charts/line-chart";

const ReturningRate = ({ className, ...props }: DivProps) => {
  return (
    <div
      className={cn("shadow border border-border rounded-2xl", className)}
      {...props}
    >
      <div className="p-6 pb-2 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h6 className="font-semibold">50.56%</h6>
            <span className="text-xs font-medium text-emerald-500 px-1 py-0.5 rounded-sm bg-card">
              +2.5%
            </span>
          </div>
          <p className="text-sm text-secondary-foreground">Returning Rate</p>
        </div>

        <Button variant="secondary" size="icon" className="w-8 h-8">
          <MoreHorizontal className="w-4 h-4 text-icon" />
        </Button>
      </div>

      <div className="pl-1 pr-3 relative mt-10">
        <p className="absolute top-1.5 left-6 text-sm font-medium text-secondary-foreground">
          Customers
        </p>

        <LineChart
          height={300}
          legendHorizontalPosition="right"
          colors={["#3b82f6", "#10b981"]} // blue & green
          gridColor={"hsl(var(--border))"}
          chartCategories={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
          chartSeries={[
            { name: "Returning", data: [20, 150, 75, 150, 300, 400] },
            { name: "New", data: [0, 250, 100, 17, 122, 18] },
          ]}
        />
      </div>
    </div>
  );
};

export default ReturningRate;

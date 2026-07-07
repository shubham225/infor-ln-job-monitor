import { Badge } from "@/components/ui/badge";
import { FAILURE_REASON_STYLES } from "@/constants/styles";
import { cn, formatCompactNumber } from "@/lib/utils";
import { FailureData } from "@/types/dashboard";

export default function FailureDashboardTable({
  data,
}: {
  data: FailureData[];
}) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          {data.map((item) => (
            <div key={item.label} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Badge
              key={item.key}
              variant="outline"
              className={cn(
                "rounded-sm border px-2 py-0.5 text-xs font-medium inline-flex items-center gap-1.5",
                FAILURE_REASON_STYLES[item.key as keyof typeof FAILURE_REASON_STYLES] || "bg-gray-100 text-gray-700",
              )}
            >
                {item.key}
              </Badge>
              <Badge variant="outline" className="font-bold rounded">
                {formatCompactNumber(item.count)}
              </Badge>
            </div>
          ))}

          {data.length === 0 && (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No failures detected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

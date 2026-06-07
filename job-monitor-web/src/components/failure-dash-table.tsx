import { Badge } from "@/components/ui/badge";
import { FailureData } from "@/types/dashboard";

const getFailureColor = (key: string): string => {
  if (key.includes("PENDING")) return "bg-yellow-100 text-yellow-700";
  if (key.includes("SUCCESS") || key === "EXECUTED") return "bg-green-100 text-green-700";
  if (key.includes("ERROR") || key.includes("FAILED") || key.includes("RUNTIME")) return "bg-red-100 text-red-700";
  if (key.includes("TIME_LIMIT") || key.includes("TIMEOUT")) return "bg-orange-100 text-orange-700";
  if (key.includes("CANCELED") || key === "NOT_FOUND") return "bg-gray-100 text-gray-700";
  return "bg-blue-100 text-blue-700";
};

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
              <Badge className={`${getFailureColor(item.key)} font-semibold rounded text-xs`}>
                {item.key}
              </Badge>
              <Badge variant="outline" className="font-bold rounded">
                {item.count}
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

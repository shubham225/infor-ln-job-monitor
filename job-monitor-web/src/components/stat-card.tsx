import { StatItem } from "@/types/dashboard";

export default function StatCard({
  title,
  data,
  bordered = false,
}: {
  title: string;
  data: StatItem[];
  bordered?: boolean;
}) {
  return (
    <div className="bg-white rounded-lg p-1">
      <div
        className={` p-4 space-y-3
        ${bordered ? "md:border-r border-gray-200" : ""}`}
      >
        <h3 className="font-medium text-md text-gray-700">{title}</h3>
        <div className="text-sm space-y-2">
          {data.map((item) => (
            <p
              key={item.label}
              className="font-medium text-md text-muted-foreground flex justify-between"
            >
              <span className={`flex gap-2 items-center ${item.textColor ? item.textColor : ""}`}>
                {item.icon && <item.icon size={16} />}
                {item.label}
              </span>
              <span className={`float-right ${item.textColor ? item.textColor : ""}`}>{item.value}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

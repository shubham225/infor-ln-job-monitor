import { Icon as TablerIcon } from "@tabler/icons-react";

export default function StatCardCompact({
  title,
  value,
  icon : Icon,
  bordered = false,
}: {
  title: string;
  value: string | number;
  icon?: TablerIcon;
  bordered?: boolean;
}) {
  return (
    <div className="bg-white rounded-lg p-2">
      <div
        className={` p-1 space-y-1 h-full
        ${bordered ? "md:border-r border-gray-200" : ""}`}
      >
        <h4 className="text-muted-foreground text-sm font-semibold">{title}</h4>
          <div className="flex gap-2 items-center">
              {Icon && <div className="bg-muted/70 p-2 border-muted-foreground rounded-sm"><Icon className="text-muted-foreground" size={16} /></div>}
              <h3 className="text-4xl font-semibold">{value}</h3>
          </div>
      </div>
    </div>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FailureData } from "@/types/dashboard";

export default function FailureDashboardTable({
  data,
}: {
  data: FailureData[];
}) {
  return (
    <div className="">
      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="h-9 text-xs text-gray-500">Failure Type</TableHead>
            <TableHead className="h-9 text-xs text-gray-500 text-right">Count</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div className="h-[290px] overflow-auto">
        <Table>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.label} className="hover:bg-muted/30">
                <TableCell className="py-2 text-sm font-medium">
                  <Badge className="bg-blue-100/60 text-blue-500 rounded-xs">
                  {item.key}
                  </Badge>
                </TableCell>

                <TableCell className="py-2 text-right">
                  <Badge variant="secondary" className="rounded-sm px-2.5">
                    {item.count}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}

            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="py-6 text-center text-xs text-muted-foreground"
                >
                  No failures detected
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

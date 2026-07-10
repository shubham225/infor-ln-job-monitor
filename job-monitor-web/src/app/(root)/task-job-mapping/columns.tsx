"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { TaskJobMapping } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import {
  Clipboard,
  ClipboardClock,
  Hash,
  Server,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<TaskJobMapping>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[1px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[1px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "hostName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hostname" icon={Server} />
    ),
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-foreground">{company.hostName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "taskName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Task Name"
        icon={Clipboard}
      />
    ),
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-foreground">
            {company.taskName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "jobName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Job Name"
        icon={ClipboardClock}
      />
    ),
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <Badge
            variant="secondary"
            className={cn(
              "rounded-sm border px-2 py-0.5",
              "bg-slate-50 text-slate-700 border-slate-200",
            )}
          >
            <span className="font-medium text-foreground">
              {company.jobName}
            </span>
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" icon={Hash} />
    ),
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <Badge
            variant="outline"
            className={cn(
              "rounded-sm border px-2 py-0.5",
              "bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-100",
            )}
          >
            <span className="font-medium text-foreground">
              {company.company}
            </span>
          </Badge>
        </div>
      );
    },
  },
];

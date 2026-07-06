"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ServerMapping } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink, Globe, Server } from "lucide-react";

export const columns: ColumnDef<ServerMapping>[] = [
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
    accessorKey: "hostname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hostname" icon={Server} />
    ),
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-foreground">
            {company.hostname}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "apiUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="API URL" icon={Globe} />
    ),
    cell: ({ row }) => (
      <a
        href={`https://${row.original.apiUrl}`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.preventDefault()}
        className="group inline-flex items-center gap-1 text-sm text-sky-600 hover:underline"
      >
        {row.original.apiUrl}
        <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    ),
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Building2,
  ExternalLink,
  Globe,
  Phone,
  RefreshCw,
  Tag,
} from "lucide-react";

import { Company, CategoryTag } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableColumnHeader } from "./data-table-column-header";

const CATEGORY_STYLES: Record<CategoryTag, string> = {
  B2B: "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100",
  B2C: "bg-violet-50 text-violet-700 hover:bg-violet-50 border-violet-100",
  Marketplace:
    "bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-100",
  Technology:
    "bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-100",
};

export const columns: ColumnDef<Company>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" icon={Building2} />
    ),
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <Avatar className="h-6 w-6 rounded-md">
            <AvatarImage src={company.logoUrl} alt={company.name} />
            <AvatarFallback
              className={cn(
                "rounded-md text-[10px] font-semibold text-white",
                company.logoColor
              )}
            >
              {company.logoFallback || company.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-foreground">{company.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "categories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categories" icon={Tag} />
    ),
    cell: ({ row }) => {
      const categories = row.original.categories;
      return (
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant="outline"
              className={cn(
                "rounded-md border px-2 py-0.5 text-[11px] font-medium",
                CATEGORY_STYLES[cat]
              )}
            >
              {cat}
            </Badge>
          ))}
        </div>
      );
    },
    filterFn: (row, id, value: string[]) => {
      if (!value?.length) return true;
      const rowCategories = row.getValue<CategoryTag[]>(id);
      return value.some((v) => rowCategories.includes(v as CategoryTag));
    },
  },
  {
    accessorKey: "lastInteraction",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Last interaction"
        icon={RefreshCw}
      />
    ),
    cell: ({ row }) => {
      const value = row.original.lastInteraction;
      return (
        <span
          className={cn(
            "text-sm",
            value ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {value ?? "No contact"}
        </span>
      );
    },
    sortingFn: (a, b, id) => {
      const av = a.getValue<string | null>(id);
      const bv = b.getValue<string | null>(id);
      if (!av && !bv) return 0;
      if (!av) return 1;
      if (!bv) return -1;
      return av.localeCompare(bv);
    },
  },
  {
    accessorKey: "domain",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Domains" icon={Globe} />
    ),
    cell: ({ row }) => (
      <a
        href={`https://${row.original.domain}`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.preventDefault()}
        className="group inline-flex items-center gap-1 text-sm text-sky-600 hover:underline"
      >
        {row.original.domain}
        <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" icon={Phone} />
    ),
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm tabular-nums text-foreground">
            {company.phone}
          </span>
          {company.assignee && (
            <Badge
              className={cn(
                "rounded-md border-0 px-2 py-0.5 text-[11px] font-medium",
                company.assignee.color
              )}
            >
              {company.assignee.name}
            </Badge>
          )}
        </div>
      );
    },
  }
];

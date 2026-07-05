"use client";

import { Table } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Download,
  LayoutGrid,
  Plus,
  Settings2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableFilterMenu } from "./data-table-filter";
import { DataTableFilter } from "@/lib/types";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters: DataTableFilter[];
  onFiltersChange: (filters: DataTableFilter[]) => void;
  onAddNew?: () => void;
  onExport?: () => void;
  onAskAI?: () => void;
  title?: string;
}

export function DataTableToolbar<TData>({
  table,
  filters,
  onFiltersChange,
  onAddNew,
  onExport,
  onAskAI,
  title = "Table View",
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background px-4 py-2.5">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 hover:text-sky-800"
          onClick={onAskAI}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Ask AI
        </Button>

        <Button variant="outline" size="sm" className="h-8 gap-1.5">
          <LayoutGrid className="h-3.5 w-3.5" />
          {title}
        </Button>

        <DataTableFilterMenu
          table={table}
          filters={filters}
          onFiltersChange={onFiltersChange}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-muted-foreground">
              <ArrowUpDown className="h-3.5 w-3.5" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel className="text-xs">Sort by column</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((c) => c.getCanSort())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={!!column.getIsSorted()}
                  onCheckedChange={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                  className="text-xs capitalize"
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Settings2 className="h-3.5 w-3.5" />
              View settings
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs">Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((c) => c.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  className="text-xs capitalize"
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" className="h-8 gap-1.5" onClick={onExport}>
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>

        <Button size="sm" className="h-8 gap-1.5" onClick={onAddNew}>
          <Plus className="h-3.5 w-3.5" />
          Add New
        </Button>
      </div>
    </div>
  );
}

"use client";

import { ArrowUpDown, LayoutGrid, Sparkles, Table2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DataTableFilterMenu } from "./data-table-filter";
import { useDataTable } from "./data-table-context";

interface TableFilterProps {
  onAskAI?: () => void;
  /** Hide individual clusters if you want a leaner bar */
  showAskAI?: boolean;
  /** Show the table/card view toggle — pair with <DataTableView /> */
  showViewToggle?: boolean;
  showSort?: boolean;
  className?: string;
}

export function TableFilter({
  onAskAI,
  showAskAI = false,
  showViewToggle = true,
  showSort = true,
  className,
}: TableFilterProps) {
  const { table, filters, setFilters, viewMode, setViewMode } = useDataTable();

  return (
    <div className={className ?? "flex flex-wrap items-center gap-2"}>
      {showAskAI && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 hover:text-sky-800"
          onClick={onAskAI}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Ask AI
        </Button>
      )}

      {showViewToggle && (
        <div className="inline-flex items-center rounded-md border border-border bg-muted/40 p-0.5">
          <button
            type="button"
            aria-label="Table view"
            aria-pressed={viewMode === "table"}
            onClick={() => setViewMode("table")}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-sm transition-colors",
              viewMode === "table"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Table2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Card view"
            aria-pressed={viewMode === "card"}
            onClick={() => setViewMode("card")}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-sm transition-colors",
              viewMode === "card"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      )}

      <DataTableFilterMenu
        table={table}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {showSort && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 text-muted-foreground"
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel className="text-xs">
              Sort by column
            </DropdownMenuLabel>
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
      )}
    </div>
  );
}

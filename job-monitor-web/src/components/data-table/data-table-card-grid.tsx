"use client";

import { ReactNode } from "react";
import { Row } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { useDataTable } from "./data-table-context";

interface DataTableCardGridProps<TData> {
  /** Render one card for a given row — you control the card's design */
  renderCard: (row: Row<TData>) => ReactNode;
  emptyMessage?: string;
  className?: string;
  /** Tailwind grid-cols classes for each breakpoint */
  gridClassName?: string;
}

/**
 * Card-view counterpart to <DataTable />. Reads from the same
 * <DataTableProvider> context, so filtering, sorting, and pagination stay
 * in sync with the table — only the presentation changes.
 */
export function DataTableCardGrid<TData>({
  renderCard,
  emptyMessage = "No results found.",
  className,
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}: DataTableCardGridProps<TData>) {
  const { table } = useDataTable<TData>();
  const rows = table.getRowModel().rows;

  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col overflow-hidden border-y border-border bg-background",
        className
      )}
    >
      <div className="flex-1 overflow-auto p-4">
        {rows.length ? (
          <div className={cn("grid gap-3", gridClassName)}>
            {rows.map((row) => (
              <div key={row.id}>{renderCard(row)}</div>
            ))}
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { flexRender } from "@tanstack/react-table";
import { Share2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDataTable } from "./data-table-context";
import { DataTableRowActions, RowActionsBuilder } from "./data-table-row-actions";

interface DataTableProps<TData> {
  /**
   * Row-level actions (edit, delete, duplicate, etc.), defined once per
   * entity. A single action renders as an icon button; two or more render
   * as a "..." dropdown. Reuse the same builder in your card view via
   * <DataTableRowActions /> so both views stay in sync.
   *
   * const rowActions: RowActionsBuilder<Company> = (row) => [
   *   { label: "Edit", icon: Pencil, onClick: (row) => openEdit(row) },
   *   { label: "Delete", icon: Trash2, variant: "destructive", onClick: (row) => remove(row.id) },
   * ];
   * <DataTable rowActions={rowActions} />
   */
  rowActions?: RowActionsBuilder<TData>;
  className?: string;
}

/**
 * Renders only the table itself — header, body, row selection bar.
 * Wrap your page in <DataTableProvider> and place <TableFilter />,
 * <TableActions />, and <TablePagination /> wherever you like around it;
 * they all share state through context, no props required.
 *
 * Give the surrounding layout a fixed height (e.g. `h-screen` flex column)
 * and pass `className="flex-1"` here so the table fills the remaining
 * space and scrolls internally instead of the whole page scrolling.
 */
export function DataTable<TData = unknown>({
  rowActions,
  className,
}: DataTableProps<TData>) {
  const { table } = useDataTable<TData>();

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;
  const columnCount =
    table.getVisibleLeafColumns().length + (rowActions ? 1 : 0);

  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col overflow-hidden border-y border-border bg-background",
        className
      )}
    >
      {selectedCount > 0 && (
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">
            {selectedCount} row{selectedCount > 1 ? "s" : ""} selected
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs">
              <Share2 className="h-3.5 w-3.5" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-muted-foreground"
              onClick={() => table.resetRowSelection()}
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-10 whitespace-nowrap bg-muted/40 text-xs font-medium text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
                {rowActions && <TableHead className="h-10 w-10 bg-muted/40" />}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn("group", row.getIsSelected() && "bg-primary/5")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2.5 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  {rowActions && (
                    <TableCell className="py-2.5">
                      <DataTableRowActions
                        row={row.original}
                        actions={rowActions(row.original)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnCount}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

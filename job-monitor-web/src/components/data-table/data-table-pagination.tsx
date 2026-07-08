"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDataTable } from "./data-table-context";

interface TablePaginationProps {
  className?: string;
}

function getPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("ellipsis");

  pages.push(total);

  return pages;
}

export function TablePagination({ className }: TablePaginationProps) {
  const { table } = useDataTable();

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();
  const currentPage = pageIndex + 1;
  const totalRows = table.getFilteredRowModel().rows.length;

  const rangeStart = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const rangeEnd = Math.min(rangeStart + pageSize - 1, totalRows);

  const pages = getPageList(currentPage, Math.max(pageCount, 1));

  return (
    <div
      className={cn(
        "flex shrink-0 flex-wrap items-center justify-between gap-3 bg-background px-4 py-3",
        className,
      )}
    >
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 text-xs"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {pages.map((p, idx) =>
            p === "ellipsis" ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-2 text-sm text-muted-foreground"
              >
                …
              </span>
            ) : (
              <Button
                key={p}
                variant={p === currentPage ? "default" : "ghost"}
                size="icon"
                type="button"
                className={cn(
                  "h-8 w-8 text-xs font-medium",
                  p === currentPage
                    ? ""
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => table.setPageIndex(p - 1)}
              >
                {p}
              </Button>
            ),
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 text-xs"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden text-xs text-muted-foreground sm:inline">
          Showing {rangeStart}-{rangeEnd} of {totalRows} entries
        </span>
      </div>
    </div>
  );
}

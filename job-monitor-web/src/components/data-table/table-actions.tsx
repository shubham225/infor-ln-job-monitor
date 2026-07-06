"use client";

import { Download, Plus, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTable } from "./data-table-context";

interface TableActionsProps {
  onAddNew?: () => void;
  /** Provide your own export logic, otherwise a CSV of the filtered rows is downloaded */
  onExport?: () => void;
  showViewSettings?: boolean;
  showExport?: boolean;
  showAddNew?: boolean;
  addNewLabel?: string;
  className?: string;
}

export function TableActions({
  onAddNew,
  onExport,
  showViewSettings = true,
  showExport = true,
  showAddNew = true,
  addNewLabel = "Add New",
  className,
}: TableActionsProps) {
  const { table } = useDataTable();

  const handleExport = () => {
    if (onExport) {
      onExport();
      return;
    }
    const rows = table.getFilteredRowModel().rows.map((r) => r.original);
    const csv = toCSV(rows as Record<string, unknown>[]);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "export.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={className ?? "flex items-center gap-2"}>
      {showViewSettings && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Settings2 className="h-3.5 w-3.5" />
              View settings
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs">
              Toggle columns
            </DropdownMenuLabel>
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
      )}

      {showExport && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5"
          onClick={handleExport}
        >
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
      )}

      {showAddNew && (
        <Button size="sm" className="h-8 gap-1.5" onClick={onAddNew}>
          <Plus className="h-3.5 w-3.5" />
          {addNewLabel}
        </Button>
      )}
    </div>
  );
}

function toCSV(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]).filter(
    (h) => typeof rows[0][h] !== "object"
  );
  const lines = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((h) => `"${String(row[h] ?? "").replace(/"/g, '""')}"`)
        .join(",")
    ),
  ];
  return lines.join("\n");
}

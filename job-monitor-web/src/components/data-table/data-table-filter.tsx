"use client";

import { useState } from "react";
import { Table } from "@tanstack/react-table";
import { Filter, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTableFilter } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DataTableFilterMenuProps<TData> {
  table: Table<TData>;
  filters: DataTableFilter[];
  onFiltersChange: (filters: DataTableFilter[]) => void;
}

const OPERATORS: { value: DataTableFilter["operator"]; label: string }[] = [
  { value: "is", label: "is" },
  { value: "is_not", label: "is not" },
  { value: "contains", label: "contains" },
  { value: "is_empty", label: "is empty" },
];

export function DataTableFilterMenu<TData>({
  table,
  filters,
  onFiltersChange,
}: DataTableFilterMenuProps<TData>) {
  const [open, setOpen] = useState(false);

  const filterableColumns = table
    .getAllColumns()
    .filter((c) => c.getCanFilter());

  const addFilter = () => {
    const firstColumn = filterableColumns[0];
    if (!firstColumn) return;
    onFiltersChange([
      ...filters,
      {
        id: crypto.randomUUID(),
        columnId: firstColumn.id,
        operator: "contains",
        value: "",
      },
    ]);
  };

  const updateFilter = (id: string, patch: Partial<DataTableFilter>) => {
    onFiltersChange(
      filters.map((f) => (f.id === id ? { ...f, ...patch } : f))
    );
  };

  const removeFilter = (id: string) => {
    onFiltersChange(filters.filter((f) => f.id !== id));
    const removed = filters.find((f) => f.id === id);
    if (removed) {
      table.getColumn(removed.columnId)?.setFilterValue(undefined);
    }
  };

  const applyFilter = (filter: DataTableFilter) => {
    const column = table.getColumn(filter.columnId);
    if (!column) return;
    if (filter.operator === "is_empty") {
      column.setFilterValue("__EMPTY__");
      return;
    }
    column.setFilterValue(filter.value || undefined);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-1.5",
            filters.length > 0 && "border-primary/40 bg-primary/5"
          )}
        >
          <Filter className="h-3.5 w-3.5" />
          Filter
          {filters.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-1 h-4 min-w-4 rounded-full px-1 text-[10px]"
            >
              {filters.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-96 p-3">
        <div className="flex flex-col gap-2">
          {filters.length === 0 && (
            <p className="px-1 py-2 text-sm text-muted-foreground">
              No filters applied. Add a filter to narrow down results.
            </p>
          )}

          {filters.map((filter) => (
            <div key={filter.id} className="flex items-center gap-1.5">
              <Select
                value={filter.columnId}
                onValueChange={(value) =>
                  updateFilter(filter.id, { columnId: value })
                }
              >
                <SelectTrigger className="h-8 w-32 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterableColumns.map((col) => (
                    <SelectItem key={col.id} value={col.id} className="text-xs capitalize">
                      {col.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filter.operator}
                onValueChange={(value) =>
                  updateFilter(filter.id, {
                    operator: value as DataTableFilter["operator"],
                  })
                }
              >
                <SelectTrigger className="h-8 w-28 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OPERATORS.map((op) => (
                    <SelectItem key={op.value} value={op.value} className="text-xs">
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                value={filter.value}
                disabled={filter.operator === "is_empty"}
                onChange={(e) =>
                  updateFilter(filter.id, { value: e.target.value })
                }
                placeholder="Value"
                className="h-8 flex-1 text-xs"
              />

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground"
                onClick={() => removeFilter(filter.id)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}

          <div className="flex items-center justify-between pt-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 px-2 text-xs text-muted-foreground"
              onClick={addFilter}
            >
              <Plus className="h-3.5 w-3.5" />
              Add filter
            </Button>
            {filters.length > 0 && (
              <Button
                size="sm"
                className="h-7 px-3 text-xs"
                onClick={() => {
                  filters.forEach(applyFilter);
                  setOpen(false);
                }}
              >
                Apply
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

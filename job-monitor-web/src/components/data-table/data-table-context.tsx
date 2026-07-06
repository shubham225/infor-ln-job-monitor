"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  Table,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTableFilter } from "@/types";

interface DataTableContextValue<TData> {
  table: Table<TData>;
  filters: DataTableFilter[];
  setFilters: (filters: DataTableFilter[]) => void;
  viewMode: "table" | "card";
  setViewMode: (mode: "table" | "card") => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTableContext = createContext<DataTableContextValue<any> | null>(null);

interface DataTableProviderProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  onSelectionChange?: (rows: TData[]) => void;
  /** Initial view — "table" (default) or "card" */
  defaultViewMode?: "table" | "card";
  children: ReactNode;
}

export function DataTableProvider<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  onSelectionChange,
  defaultViewMode = "table",
  children,
}: DataTableProviderProps<TData, TValue>) {
  const [viewMode, setViewMode] = useState<"table" | "card">(defaultViewMode);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [filters, setFilters] = useState<DataTableFilter[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: (updater) => {
      setRowSelection((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        if (onSelectionChange) {
          const selectedRows = table
            .getRowModel()
            .rows.filter((r) => next[r.id])
            .map((r) => r.original);
          onSelectionChange(selectedRows);
        }
        return next;
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <DataTableContext.Provider
      value={{ table, filters, setFilters, viewMode, setViewMode }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

export function useDataTable<TData = unknown>() {
  const ctx = useContext(DataTableContext);
  if (!ctx) {
    throw new Error("useDataTable must be used within a <DataTableProvider>");
  }
  return ctx as DataTableContextValue<TData>;
}

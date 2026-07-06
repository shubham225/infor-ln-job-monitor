"use client";

import { ReactNode } from "react";

import { useDataTable } from "./data-table-context";

interface DataTableViewProps {
  /** Rendered when viewMode === "table" */
  table: ReactNode;
  /** Rendered when viewMode === "card" */
  card: ReactNode;
}

/**
 * Renders whichever slot matches the current viewMode from context.
 * Pair with the view toggle inside <TableFilter /> — clicking the
 * table/card icons flips `viewMode` and this swaps automatically.
 *
 * <DataTableView
 *   table={<DataTable className="flex-1" />}
 *   card={<DataTableCardGrid renderCard={(row) => <MyCard row={row} />} />}
 * />
 */
export function DataTableView({ table, card }: DataTableViewProps) {
  const { viewMode } = useDataTable();
  return <>{viewMode === "card" ? card : table}</>;
}

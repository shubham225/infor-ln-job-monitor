"use client";

/**
 * Convenience wrapper that renders <TableFilter /> + <TableActions /> in the
 * classic left/right toolbar layout. Use this if you don't need custom
 * placement; otherwise import TableFilter / TableActions directly and
 * arrange them however you like — see table-filter.tsx and table-actions.tsx.
 */
import { TableActions } from "./table-actions";
import { TableFilter } from "./table-filter";

interface DataTableToolbarProps {
  onAddNew?: () => void;
  onExport?: () => void;
  onAskAI?: () => void;
}

export function DataTableToolbar({
  onAddNew,
  onExport,
  onAskAI,
}: DataTableToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background px-4 py-2.5">
      <TableFilter onAskAI={onAskAI} />
      <TableActions onAddNew={onAddNew} onExport={onExport} />
    </div>
  );
}

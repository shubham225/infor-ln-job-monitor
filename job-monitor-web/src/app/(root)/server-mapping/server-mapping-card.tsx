"use client";

import { Row } from "@tanstack/react-table";
import { ExternalLink, Server } from "lucide-react";

import { DataTableRowActions, RowAction } from "@/components/data-table/data-table-row-actions";
import type { ServerMapping } from "@/types/api";

interface ServerMappingCardProps {
  row: Row<ServerMapping>;
  /** Same action list passed to <DataTable rowActions={...} /> — keeps
   * table view and card view in sync automatically. */
  actions: RowAction<ServerMapping>[];
}

export function ServerMappingCard({ row, actions }: ServerMappingCardProps) {
  const mapping = row.original;

  return (
    <div className="group flex flex-col gap-3 rounded-xl border border-border bg-background p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Server size={18} />
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">
              {mapping.hostname}
            </p>
            <p className="text-xs text-muted-foreground">BW Hostname</p>
          </div>
        </div>

        <DataTableRowActions
          row={mapping}
          actions={actions}
          visibility="reveal"
        />
      </div>

      <div className="rounded-lg border border-border bg-muted/30 px-3 py-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          API URL
        </p>
        <a
          href={mapping.apiUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.preventDefault()}
          className="group/link mt-0.5 flex items-center gap-1 truncate text-sm text-sky-600 hover:underline"
        >
          <span className="truncate">{mapping.apiUrl}</span>
          <ExternalLink className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover/link:opacity-100" />
        </a>
      </div>
    </div>
  );
}

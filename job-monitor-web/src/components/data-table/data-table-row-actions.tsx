"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

/** Any icon component that accepts a size (lucide-react and
 * @tabler/icons-react components both satisfy this). */
type ActionIcon = React.ComponentType<{ size?: number; className?: string }>;

export interface RowAction<TData> {
  label: string;
  icon?: ActionIcon;
  onClick: (row: TData) => void;
  /** Styles the action red, for destructive operations like delete */
  variant?: "default" | "destructive";
  /** Hide this action for a given row */
  hidden?: (row: TData) => boolean;
  /** Disable (but still show) this action for a given row */
  disabled?: (row: TData) => boolean;
  /** Render a separator above this item in the dropdown (ignored for single-action mode) */
  separatorBefore?: boolean;
}

/**
 * A column-definitions-agnostic row action list. Define once per entity
 * (see app/server-mapping/row-actions.tsx for an example) and reuse it
 * both as the `rowActions` prop on <DataTable /> and inside your own card
 * component via <DataTableRowActions />, so table view and card view never
 * fall out of sync.
 */
export type RowActionsBuilder<TData> = (row: TData) => RowAction<TData>[];

interface DataTableRowActionsProps<TData> {
  row: TData;
  actions: RowAction<TData>[];
  /** "reveal" (default) shows on row hover; "visible" always shows — better for cards */
  visibility?: "reveal" | "visible";
  className?: string;
}

export function DataTableRowActions<TData>({
  row,
  actions,
  visibility = "reveal",
  className,
}: DataTableRowActionsProps<TData>) {
  const visibleActions = actions.filter((action) => !action.hidden?.(row));

  if (!visibleActions.length) return null;

  const revealClass =
    visibility === "reveal" ? "opacity-0 group-hover:opacity-100" : "";

  if (visibleActions.length === 1) {
    const action = visibleActions[0];
    const Icon = action.icon;
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label={action.label}
        disabled={action.disabled?.(row)}
        onClick={() => action.onClick(row)}
        className={cn(
          "h-7 w-7 transition-opacity",
          revealClass,
          action.variant === "destructive" && "hover:text-red-500",
          className
        )}
      >
        {Icon ? <Icon size={16} /> : null}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-7 w-7 transition-opacity", revealClass, className)}
        >
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {visibleActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <div key={action.label}>
              {idx > 0 && action.separatorBefore && <DropdownMenuSeparator />}
              <DropdownMenuItem
                disabled={action.disabled?.(row)}
                onClick={() => action.onClick(row)}
                className={cn(
                  "text-xs",
                  action.variant === "destructive" &&
                    "text-red-600 focus:text-red-600"
                )}
              >
                {Icon && <Icon size={14} className="mr-2" />}
                {action.label}
              </DropdownMenuItem>
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

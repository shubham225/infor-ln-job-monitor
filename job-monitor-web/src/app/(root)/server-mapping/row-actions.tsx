import { IconTrash } from "@tabler/icons-react";

import { RowAction } from "@/components/data-table/data-table-row-actions";
import type { ServerMapping } from "@/types/api";

/**
 * One place to define what actions a server mapping row supports.
 * Passed to <DataTable rowActions={...} /> for the table view and to
 * <DataTableRowActions actions={...} /> inside the card view — add a new
 * action here (e.g. "Edit") and both views get it automatically.
 */
export function getServerMappingRowActions(
  onDelete: (mapping: ServerMapping) => void
): (row: ServerMapping) => RowAction<ServerMapping>[] {
  return (row) => [
    {
      label: "Delete",
      icon: IconTrash,
      variant: "destructive",
      onClick: () => onDelete(row),
    },
  ];
}

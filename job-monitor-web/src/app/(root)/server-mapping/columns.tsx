"use client";

import { Button } from "@/components/ui/button";
import { ServerMapping } from "@/types/api";
import { IconTrash } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteIcon } from "lucide-react";

export const columns = (onDelete : (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void) => {
  return [
    {
      accessorKey: "hostname",
      header: "BW HostName",
      size: 30,
      minSize: 30,
    },
    {
      accessorKey: "apiUrl",
      header: "ApiURL",
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                console.log(`deleting: ${row.original.id}`);
                onDelete(e, row.original.id);
              }}
            >
              <div className="flex gap-2 items-center justify-center hover:text-red-500">
                <IconTrash />
              </div>
            </Button>
          </div>
        );
      },
      size: 30,
      minSize: 30,
    },
  ] satisfies ColumnDef<ServerMapping>[];
};

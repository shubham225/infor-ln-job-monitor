"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { DataTableProvider } from "@/components/data-table/data-table-context";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableView } from "@/components/data-table/data-table-view";
import { DataTableCardGrid } from "@/components/data-table/data-table-card-grid";
import { TableFilter } from "@/components/data-table/table-filter";
import { TableActions } from "@/components/data-table/table-actions";
import { TablePagination } from "@/components/data-table/data-table-pagination";
import { columns } from "./columns";
import { ServerMappingCard } from "./server-mapping-card";
import type { ServerMapping } from "@/types/api";
import { initServerMapping } from "@/constants/init-data";
import {
  addServerMappings,
  deleteServerMappings,
  fetchServerMappings,
} from "@/service/server-mapping-service";
import { getErrorMessage } from "@/lib/api-error";
import { useMounted } from "@/hooks/use-mounted";
import { Row } from "@tanstack/react-table";
import ServerMappingDialog from "./server-mapping-dialog";
import { getServerMappingRowActions } from "./row-actions";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

export default function ServerMappingPage() {
  const [open, setOpen] = useState(false);
  const [serverMappings, setServerMappings] = useState<ServerMapping[] | []>(
    [],
  );
  const [serverMapping, setServerMapping] =
    useState<ServerMapping>(initServerMapping);
  const isMounted = useMounted();
  const { confirmDelete, dialog } = useConfirmDialog();

  useEffect(() => {
    const fetchAppSettingsAsync = async () => {
      try {
        const response = await fetchServerMappings();
        setServerMappings(response);
      } catch (error) {
        const message = getErrorMessage(error);
        toast.error(message);
      }
    };

    fetchAppSettingsAsync();
  }, []);

  if (!isMounted) {
    return null;
  }

  const openNewMappingDialog = async () => {
    try {
      // Execute any custom async logic (e.g., API calls, checking permissions)
      // await checkUserPermissions()

      setOpen(true); // Open the dialog programmatically
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMapping = async () => {
    try {
      const response = await addServerMappings(serverMapping);
      setServerMappings((prev) => [...prev, response]);
      setServerMapping(initServerMapping);
      setOpen(false);
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  };

  const handleDeleteMapping = async (
    id: string,
  ) => {
    try {
      await deleteServerMappings(id);
      setServerMappings((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      console.error("Error deleting server mapping:", error);
    }
  };
  
  const rowActions = getServerMappingRowActions(async (mapping) => {
    const confirmed = await confirmDelete({
      title: "Delete Server Mapping",
      description: `Are you sure you want to delete "${mapping.hostname}"?`,
    });
    if (!confirmed) return;
    handleDeleteMapping(mapping.id)
  }
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Confirm Delete Dialog */}
      {dialog}
      {/* Dialog */}
      <ServerMappingDialog
        open={open}
        setOpen={setOpen}
        serverMapping={serverMapping}
        setServerMapping={setServerMapping}
        handleAddMapping={handleAddMapping}
      />
      

      {/* Table / Card */}
      <DataTableProvider
        columns={columns}
        data={serverMappings}
        pageSize={9}
        defaultViewMode="card"
      >
        <div className="flex flex-col overflow-hidden bg-muted/20">
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 bg-background px-4 py-2.5">
              <TableFilter showAskAI={false} />
              <TableActions
                showAddNew={true}
                showViewSettings={true}
                onAddNew={openNewMappingDialog}
              />
            </div>

            <DataTableView
              table={<DataTable className="flex-1" rowActions={rowActions} />}
              card={
                <DataTableCardGrid
                  className="flex-1"
                  gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  emptyMessage="No server mappings yet. Click “Add Mapping” to create one."
                  renderCard={(row: Row<ServerMapping>) => (
                    <ServerMappingCard
                      row={row}
                      actions={rowActions(row.original)}
                    />
                  )}
                />
              }
            />
            {serverMappings.length > 9 && <TablePagination />}
          </div>
        </div>
      </DataTableProvider>
    </div>
  );
}

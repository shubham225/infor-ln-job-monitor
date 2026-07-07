"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTableProvider } from "@/components/data-table/data-table-context";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableView } from "@/components/data-table/data-table-view";
import { DataTableCardGrid } from "@/components/data-table/data-table-card-grid";
import { TableFilter } from "@/components/data-table/table-filter";
import { TableActions } from "@/components/data-table/table-actions";
import { TablePagination } from "@/components/data-table/data-table-pagination";
import { AddStatusDialog } from "@/components/exclusions/add-exclusion-dialogs";
import {
  addExclusionJobStatus,
  deleteExclusionJobStatus,
  fetchExclusionJobStatuses,
} from "@/service/exclusion-service";
import { ExclusionJobStatus } from "@/types/api";
import { ERPJobStatus } from "@/types/enums";
import { Badge } from "../ui/badge";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { getJobStatusExclusionRowActions } from "./job-status-exclusion-row-actions";
import { RowAction } from "../data-table/data-table-row-actions";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { CheckCircle2 } from "lucide-react";
import { JOB_STATUS_STYLE } from "@/constants/styles";
import { cn } from "@/lib/utils";

const availableStatuses = Object.values(ERPJobStatus) as ERPJobStatus[];

export default function JobStatusExclusionSettings() {
  const [statusExclusions, setStatusExclusions] = useState<
    ExclusionJobStatus[]
  >([]);
  const [selectedStatusHostName, setSelectedStatusHostName] = useState("");
  const [newStatusHostName, setNewStatusHostName] = useState("");
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<ERPJobStatus>(
    availableStatuses[0] ?? ERPJobStatus.UNKNOWN,
  );
  const { confirmDelete, dialog } = useConfirmDialog();

  const statusServers = useMemo(
    () => Array.from(new Set(statusExclusions.map((item) => item.hostName))),
    [statusExclusions],
  );

  const selectedStatusItems = useMemo(
    () =>
      statusExclusions.filter(
        (item) => item.hostName === selectedStatusHostName,
      ),
    [statusExclusions, selectedStatusHostName],
  );

  useEffect(() => {
    if (!selectedStatusHostName && statusServers.length) {
      setSelectedStatusHostName(statusServers[0]);
    }
  }, [statusServers, selectedStatusHostName]);

  useEffect(() => {
    const loadExclusions = async () => {
      try {
        const statuses = await fetchExclusionJobStatuses();

        setStatusExclusions(statuses);

        setSelectedStatusHostName(
          (current) => current || statuses[0]?.hostName || "",
        );
      } catch (error) {
        console.error("Failed to load exclusion data:", error);
      }
    };

    loadExclusions();
  }, []);

  const handleStatusDialogOpenChange = (open: boolean) => {
    setIsStatusDialogOpen(open);
    if (open && selectedStatusHostName) {
      setNewStatusHostName(selectedStatusHostName);
    }
  };

  async function addStatusExclusion() {
    const hostName = newStatusHostName.trim();
    if (!newStatus || !hostName) return;

    try {
      const createdStatus = await addExclusionJobStatus({
        id: 0,
        hostName,
        status: newStatus,
      });
      setStatusExclusions((current) => [...current, createdStatus]);
      setSelectedStatusHostName(createdStatus.hostName);
      setNewStatusHostName("");
      setIsStatusDialogOpen(false);
    } catch (error) {
      console.error("Failed to add exclusion status:", error);
    }
  }

  async function deleteStatusExclusion(id: number) {
    try {
      await deleteExclusionJobStatus(id);
      setStatusExclusions((current) =>
        current.filter((item) => item.id !== id),
      );
    } catch (error) {
      console.error("Failed to delete exclusion status:", error);
    }
  }

  const rowActions = getJobStatusExclusionRowActions(async (mapping) => {
    const confirmed = await confirmDelete({
      title: "Delete Status Exclusion",
      description: `Are you sure you want to delete status "${mapping.status}"?`,
    });
    if (!confirmed) return;
    deleteStatusExclusion(mapping.id);
  });

  const statusColumns = useMemo<ColumnDef<ExclusionJobStatus>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-[1px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[1px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Status"
            icon={CheckCircle2}
          />
        ),
        cell: ({ row }) => {
          const statusExclusion = row.original;
          const jobStatus: ERPJobStatus = statusExclusion.status;

          return (
            <div className="flex items-center gap-2.5">
              <span className="font-medium text-foreground">
                <Badge
                  key={jobStatus}
                  variant="outline"
                  className={cn(
                    "rounded-sm border px-2 py-0.5 text-xs font-medium inline-flex items-center gap-1.5",
                    JOB_STATUS_STYLE[jobStatus],
                  )}
                >
                  {jobStatus}
                </Badge>
              </span>
            </div>
          );
        },
      },
    ],
    [],
  );

  const onNewAction = () => {
    setIsStatusDialogOpen(true);
    if (selectedStatusHostName) {
      setNewStatusHostName(selectedStatusHostName);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Confirm Delete Dialog */}
      {dialog}
      <div className="pt-2 flex justify-end px-4">
        <Badge variant="secondary">
          Suppress alerts you don&apos;t want to see by status, on a per-server
          basis.
        </Badge>
      </div>

      <ExclusionPanel
        servers={statusServers}
        selectedServer={selectedStatusHostName}
        onSelectServer={setSelectedStatusHostName}
        rows={selectedStatusItems}
        columns={statusColumns}
        rowActions={rowActions}
        onNewAction={onNewAction}
        emptyLabel="No job status exclusions for this server yet."
        addSlot={
          <AddStatusDialog
            open={isStatusDialogOpen}
            onOpenChange={handleStatusDialogOpenChange}
            hostName={newStatusHostName}
            onHostNameChange={setNewStatusHostName}
            status={newStatus}
            onStatusChange={setNewStatus}
            onSubmit={addStatusExclusion}
          />
        }
      />
    </div>
  );
}

function ExclusionPanel<T>({
  servers,
  selectedServer,
  onSelectServer,
  rows,
  columns,
  addSlot,
  rowActions,
  onNewAction,
  emptyLabel,
}: {
  servers: string[];
  selectedServer: string;
  onSelectServer: (value: string) => void;
  rows: T[];
  columns: ColumnDef<T>[];
  addSlot: ReactNode;
  rowActions: (row: T) => RowAction<T>[];
  onNewAction: () => void;
  emptyLabel: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Server
          </span>
          <Select value={selectedServer} onValueChange={onSelectServer}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Choose server" />
            </SelectTrigger>
            <SelectContent>
              {servers.map((server) => (
                <SelectItem key={server} value={server}>
                  {server}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {rows.length} exclusion{rows.length === 1 ? "" : "s"}
          </span>
        </div>
        {addSlot}
      </div>

      <DataTableProvider columns={columns} data={rows} pageSize={7}>
        <div className="overflow-hidden bg-background">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2.5">
            <TableFilter showAskAI={false} showViewToggle={false} />
            <TableActions
              showAddNew={true}
              showViewSettings={false}
              onAddNew={onNewAction}
            />
          </div>
          <DataTableView
            table={<DataTable className="flex-1" rowActions={rowActions} />}
            card={<DataTableCardGrid renderCard={() => <div />} />}
          />
          {rows.length === 0 && (
            <div className="px-4 py-14 text-center text-sm text-muted-foreground">
              {emptyLabel}
            </div>
          )}
          {rows.length > 6 && (
            <div className="flex flex-wrap items-center justify-between gap-2 border-t px-4 py-2">
              <TablePagination />
            </div>
          )}
        </div>
      </DataTableProvider>
    </div>
  );
}

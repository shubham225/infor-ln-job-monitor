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
import { AddMessageDialog } from "@/components/exclusions/add-exclusion-dialogs";
import {
  addExclusionMessage,
  deleteExclusionMessage,
  fetchExclusionMessages,
} from "@/service/exclusion-service";
import { ExclusionMessage } from "@/types/api";
import { Badge } from "../ui/badge";
import { getMessageExclusionRowActions } from "./message-exclusion-row-actions";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { RowAction } from "../data-table/data-table-row-actions";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { MessageSquare } from "lucide-react";

export default function MessageExclusionSettings() {
  const [messageExclusions, setMessageExclusions] = useState<
    ExclusionMessage[]
  >([]);
  const [selectedErrorHostName, setSelectedErrorHostName] = useState("");
  const [newErrorMessage, setNewErrorMessage] = useState("");
  const [newMessageHostName, setNewMessageHostName] = useState("");
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const { confirmDelete, dialog } = useConfirmDialog();

  const errorServers = useMemo(
    () => Array.from(new Set(messageExclusions.map((item) => item.hostName))),
    [messageExclusions],
  );

  const selectedErrorMessages = useMemo(
    () =>
      messageExclusions.filter(
        (item) => item.hostName === selectedErrorHostName,
      ),
    [messageExclusions, selectedErrorHostName],
  );

  useEffect(() => {
    if (!selectedErrorHostName && errorServers.length) {
      setSelectedErrorHostName(errorServers[0]);
    }
  }, [errorServers, selectedErrorHostName]);

  useEffect(() => {
    const loadExclusions = async () => {
      try {
        const messages = await fetchExclusionMessages();

        setMessageExclusions(messages);
        setSelectedErrorHostName(
          (current) => current || messages[0]?.hostName || "",
        );
      } catch (error) {
        console.error("Failed to load exclusion data:", error);
      }
    };

    loadExclusions();
  }, []);

  const handleMessageDialogOpenChange = (open: boolean) => {
    setIsMessageDialogOpen(open);
    if (open && selectedErrorHostName) {
      setNewMessageHostName(selectedErrorHostName);
    }
  };

  async function addErrorMessage() {
    const value = newErrorMessage.trim();
    const hostName = newMessageHostName.trim();
    if (!value || !hostName) return;

    try {
      const createdMessage = await addExclusionMessage({
        id: 0,
        hostName,
        message: value,
      });
      setMessageExclusions((current) => [...current, createdMessage]);
      setSelectedErrorHostName(createdMessage.hostName);
      setNewErrorMessage("");
      setNewMessageHostName("");
      setIsMessageDialogOpen(false);
    } catch (error) {
      console.error("Failed to add exclusion message:", error);
    }
  }

  async function deleteErrorMessage(id: number) {
    try {
      await deleteExclusionMessage(id);
      setMessageExclusions((current) =>
        current.filter((item) => item.id !== id),
      );
    } catch (error) {
      console.error("Failed to delete exclusion message:", error);
    }
  }

  const messageColumns = useMemo<ColumnDef<ExclusionMessage>[]>(
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
        accessorKey: "message",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Message"
            icon={MessageSquare}
          />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-foreground">
            {row.original.message}
          </span>
        ),
      },
    ],
    [],
  );

  const rowActions = getMessageExclusionRowActions(async (mapping) => {
    const confirmed = await confirmDelete({
      title: "Delete Message Exclusion",
      description: `Are you sure you want to delete message "${mapping.message}"?`,
    });
    if (!confirmed) return;
    deleteErrorMessage(mapping.id);
  });

  const onNewAction = () => {
    setIsMessageDialogOpen(true);
    if (selectedErrorHostName) {
      setNewMessageHostName(selectedErrorHostName);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Confirm Delete Dialog */}
      {dialog}
      <div className="pt-2 flex justify-end px-4">
        <Badge variant="secondary">
          Suppress alerts you don&apos;t want to see, by error message, on a
          per-server basis.
        </Badge>
      </div>

      <ExclusionPanel
        servers={errorServers}
        selectedServer={selectedErrorHostName}
        onSelectServer={setSelectedErrorHostName}
        rows={selectedErrorMessages}
        columns={messageColumns}
        rowActions={rowActions}
        onNewAction={onNewAction}
        emptyLabel="No error message exclusions for this server yet."
        addSlot={
          <AddMessageDialog
            open={isMessageDialogOpen}
            onOpenChange={handleMessageDialogOpenChange}
            hostName={newMessageHostName}
            onHostNameChange={setNewMessageHostName}
            message={newErrorMessage}
            onMessageChange={setNewErrorMessage}
            onSubmit={addErrorMessage}
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
            <div className="flex flex-wrap items-center justify-between gap-2 border-t py-2">
              <TablePagination />
            </div>
          )}
        </div>
      </DataTableProvider>
    </div>
  );
}

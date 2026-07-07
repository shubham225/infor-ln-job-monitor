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
import { AddJobDialog } from "@/components/exclusions/add-exclusion-dialogs";
import {
  addExclusionJob,
  deleteExclusionJob,
  fetchExclusionJobs,
} from "@/service/exclusion-service";
import { ExclusionJob } from "@/types/api";
import { Badge } from "../ui/badge";
import { getJobExclusionRowActions } from "./job-exclusion-row-actions";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { RowAction } from "../data-table/data-table-row-actions";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { ClipboardClock, Hash } from "lucide-react";

export default function JobExclusionSettings() {
  const [jobExclusions, setJobExclusions] = useState<ExclusionJob[]>([]);
  const [selectedJobHostName, setSelectedJobHostName] = useState("");
  const [newJobHostName, setNewJobHostName] = useState("");
  const [newJobName, setNewJobName] = useState("");
  const [newJobCompany, setNewJobCompany] = useState("");
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const { confirmDelete, dialog } = useConfirmDialog();

  const jobServers = useMemo(
    () => Array.from(new Set(jobExclusions.map((item) => item.hostName))),
    [jobExclusions],
  );

  const selectedJobItems = useMemo(
    () => jobExclusions.filter((item) => item.hostName === selectedJobHostName),
    [jobExclusions, selectedJobHostName],
  );

  useEffect(() => {
    if (!selectedJobHostName && jobServers.length) {
      setSelectedJobHostName(jobServers[0]);
    }
  }, [jobServers, selectedJobHostName]);

  useEffect(() => {
    const loadExclusions = async () => {
      try {
        const jobs = await fetchExclusionJobs();

        setJobExclusions(jobs);

        setSelectedJobHostName((current) => current || jobs[0]?.hostName || "");
      } catch (error) {
        console.error("Failed to load exclusion data:", error);
      }
    };

    loadExclusions();
  }, []);

  const handleJobDialogOpenChange = (open: boolean) => {
    setIsJobDialogOpen(open);
    if (open && selectedJobHostName) {
      setNewJobHostName(selectedJobHostName);
    }
  };

  async function addJobExclusion() {
    const hostName = newJobHostName.trim();
    const job = newJobName.trim();
    const company = newJobCompany.trim();
    if (!hostName || !job || !company) return;

    try {
      const createdJob = await addExclusionJob({
        id: 0,
        hostName,
        jobName: job,
        company,
      });
      setJobExclusions((current) => [...current, createdJob]);
      setSelectedJobHostName(createdJob.hostName);
      setNewJobHostName("");
      setNewJobName("");
      setNewJobCompany("");
      setIsJobDialogOpen(false);
    } catch (error) {
      console.error("Failed to add exclusion job:", error);
    }
  }

  async function deleteJobExclusion(id: number) {
    try {
      await deleteExclusionJob(id);
      setJobExclusions((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete exclusion job:", error);
    }
  }

  const jobColumns = useMemo<ColumnDef<ExclusionJob>[]>(
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
        accessorKey: "jobName",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Job Name"
            icon={ClipboardClock}
          />
        ),
        cell: ({ row }) => {
          const company = row.original;
          return (
            <div className="flex items-center gap-2.5">
              <Badge
                variant="secondary"
                className={cn(
                  "rounded-sm border px-2 py-0.5",
                  "bg-slate-50 text-slate-700 border-slate-200",
                )}
              >
                <span className="font-medium text-foreground">
                  {company.jobName}
                </span>
              </Badge>
            </div>
          );
        },
      },
      {
        accessorKey: "company",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Company" icon={Hash} />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2.5">
              <Badge
                variant="outline"
                className={cn(
                  "rounded-sm border px-2 py-0.5",
                  "bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-100",
                )}
              >
                <span className="font-medium text-foreground">
                  {row.original.company}
                </span>
              </Badge>
            </div>
          );
        },
      },
    ],
    [],
  );

  const rowActions = getJobExclusionRowActions(async (mapping) => {
    const confirmed = await confirmDelete({
      title: "Delete Job Exclusion",
      description: `Are you sure you want to delete job "${mapping.jobName}"?`,
    });
    if (!confirmed) return;
    deleteJobExclusion(mapping.id);
  });

  const onNewAction = () => {
    setIsJobDialogOpen(true);
    if (selectedJobHostName) {
      setNewJobHostName(selectedJobHostName);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Confirm Delete Dialog */}
      {dialog}
      <div className="pt-2 flex justify-end px-4">
        <Badge variant="secondary">
          Suppress alerts you don&apos;t want to see, by job, on a per-server
          basis.
        </Badge>
      </div>

      <ExclusionPanel
        servers={jobServers}
        selectedServer={selectedJobHostName}
        onSelectServer={setSelectedJobHostName}
        rows={selectedJobItems}
        columns={jobColumns}
        rowActions={rowActions}
        onNewAction={onNewAction}
        emptyLabel="No job exclusions for this server yet."
        addSlot={
          <AddJobDialog
            open={isJobDialogOpen}
            onOpenChange={handleJobDialogOpenChange}
            hostName={newJobHostName}
            onHostNameChange={setNewJobHostName}
            jobName={newJobName}
            onJobNameChange={setNewJobName}
            company={newJobCompany}
            onCompanyChange={setNewJobCompany}
            onSubmit={addJobExclusion}
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

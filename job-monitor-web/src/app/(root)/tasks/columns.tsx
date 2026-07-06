"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { RunningTask } from "@/types/api";
import { ERPJobStatus, TaskSchedulerStatus } from "@/types/enums";
import { ColumnDef } from "@tanstack/react-table";
import {
  CalendarClock,
  CheckCircle2,
  Clipboard,
  ClipboardClock,
  Hash,
  Server,
  UserCog,
} from "lucide-react";

const JOB_STATUS_STYLE: Record<ERPJobStatus, string> = {
  [ERPJobStatus.FREE]: "bg-green-50 text-green-700 border-green-200",
  [ERPJobStatus.WAITING]: "bg-yellow-50 text-yellow-700 border-yellow-200",
  [ERPJobStatus.RUNNING]: "bg-blue-50 text-blue-700 border-blue-200",
  [ERPJobStatus.CANCELED]: "bg-gray-50 text-gray-700 border-gray-200",
  [ERPJobStatus.RUNTIME_ERROR]: "bg-red-50 text-red-700 border-red-200",
  [ERPJobStatus.IN_QUEUE]: "bg-purple-50 text-purple-700 border-purple-200",
  [ERPJobStatus.BLOCKED]: "border-orange-500 text-orange-500",
  [ERPJobStatus.UNKNOWN]: "border-gray-500 text-gray-500",
};

const MONITOR_STATUS_STYLE: Record<TaskSchedulerStatus, string> = {
  [TaskSchedulerStatus.READY]: "bg-sky-50 text-sky-700 border-sky-200",
  [TaskSchedulerStatus.RUNNING]: "bg-green-50 text-green-700 border-green-200",
  [TaskSchedulerStatus.PAUSED]:
    "bg-yellow-50 text-yellow-700 border-yellow-200",
  [TaskSchedulerStatus.DISABLED]: "bg-gray-50 text-gray-700 border-gray-200",
  [TaskSchedulerStatus.QUEUED]:
    "bg-purple-50 text-purple-700 border-purple-200",
  [TaskSchedulerStatus.WAITING]: "bg-blue-50 text-blue-700 border-blue-200",
  [TaskSchedulerStatus.IDLE]: "bg-gray-50 text-gray-700 border-gray-200",
  [TaskSchedulerStatus.TERMINATED]: "bg-red-50 text-red-700 border-red-200",
  [TaskSchedulerStatus.MISSED]:
    "bg-orange-50 text-orange-700 border-orange-200",
  [TaskSchedulerStatus.NO_MORE_RUNS]:
    "bg-gray-50 text-gray-700 border-gray-200",
  [TaskSchedulerStatus.NOT_SCHEDULED]:
    "bg-gray-50 text-gray-700 border-gray-200",
  [TaskSchedulerStatus.TRANSITION]:
    "bg-yellow-50 text-yellow-700 border-yellow-200",
  [TaskSchedulerStatus.COULD_NOT_START]:
    "bg-red-50 text-red-700 border-red-200",
  [TaskSchedulerStatus.HAS_NOT_RUN]: "bg-gray-50 text-gray-700 border-gray-200",
  [TaskSchedulerStatus.UNKNOWN]: "bg-gray-50 text-gray-700 border-gray-200",
  [TaskSchedulerStatus.PENDING]:
    "bg-yellow-50 text-yellow-700 border-yellow-200",
};

export const columns: ColumnDef<RunningTask>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    accessorKey: "taskName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Task Name"
        icon={Clipboard}
      />
    ),
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-foreground">
            {company.taskName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Monitoring Status"
        icon={CheckCircle2}
      />
    ),
    cell: ({ row }) => {
      const company = row.original;
      const monitoringStatus: TaskSchedulerStatus = company.status;
      return (
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-foreground">
            <Badge
              key={monitoringStatus}
              variant="outline"
              className={cn(
                "rounded-sm border px-2 py-0.5 text-[10px] font-medium inline-flex items-center gap-1.5",
                MONITOR_STATUS_STYLE[monitoringStatus],
              )}
            >
              {monitoringStatus}
            </Badge>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "executedOn",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Executed On"
        icon={CalendarClock}
      />
    ),
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-foreground">
            {new Date(company.executedOn).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
      );
    },
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
      const company = row.original;
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
              {company.company}
            </span>
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "server",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Server" icon={Server} />
    ),
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-foreground">{company.server}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "jobStatus",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Job Status"
        icon={CheckCircle2}
      />
    ),
    cell: ({ row }) => {
      const company = row.original;
      const jobStatus: ERPJobStatus = company.jobStatus;

      return (
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-foreground">
            <Badge
              key={jobStatus}
              variant="outline"
              className={cn(
                "rounded-sm border px-2 py-0.5 text-[10px] font-medium inline-flex items-center gap-1.5",
                JOB_STATUS_STYLE[jobStatus],
              )}
            >
              {company.jobStatus}
            </Badge>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "jobUser",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job User" icon={UserCog} />
    ),
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-2.5">
          {company.jobUser && (
            <Avatar className="h-6 w-6 rounded-full">
              <AvatarFallback
                className={cn(
                  "rounded-full text-[10px] font-semibold text-white",
                  "bg-red-500",
                )}
              >
                {company.jobUser?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
          <span className="font-medium text-foreground">{company.jobUser}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "jobStartedAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Job Started At"
        icon={CalendarClock}
      />
    ),
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-foreground">
            {new Date(company.jobStartedAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
      );
    },
  },
];

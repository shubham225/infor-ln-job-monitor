"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { JOB_STATUS_STYLE, MONITOR_STATUS_STYLE } from "@/constants/styles";
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

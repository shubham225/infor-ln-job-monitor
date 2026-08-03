"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ExecutionHistory } from "@/types/api";
import { ERPJobStatus, FailureReason } from "@/types/enums";
import { ColumnDef } from "@tanstack/react-table";
import {
  CalendarClock,
  CheckCircle2,
  Clipboard,
  ClipboardClock,
  Hash,
  MailQuestion,
  Server,
  ShieldAlert,
  UserCog,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FAILURE_REASON_STYLES, JOB_STATUS_STYLE, YES_NO_STYLES } from "@/constants/styles";

const formatFailure = (value?: string) =>
  value
    ?.replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase()) ?? "—";

export const columns: ColumnDef<ExecutionHistory>[] = [
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
    accessorKey: "cause",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Failure Reason"
        icon={ShieldAlert}
      />
    ),
    cell: ({ row }) => {
      const company: ExecutionHistory = row.original;
      const failureReason: FailureReason = company.cause ?? "EXECUTED";

      return (
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-foreground">
            <Badge
              key={failureReason}
              variant="outline"
              className={cn(
                "rounded-sm border px-2 py-0.5 text-[10px] font-medium inline-flex items-center gap-1.5",
                FAILURE_REASON_STYLES[failureReason],
              )}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
              {formatFailure(company.cause)}
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
    accessorKey: "terminatedOn",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Terminated On"
        icon={CalendarClock}
      />
    ),
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-foreground">
            {new Date(company.terminatedOn).toLocaleString("en-US", {
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
    accessorKey: "isMailSent",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Mail Sent"
        icon={MailQuestion}
      />
    ),
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-2.5">
          <span className="font-medium text-foreground">
            <Badge
              variant="outline"
              className={cn(
                "rounded-sm border px-2 py-0.5 text-[10px] font-medium",
                YES_NO_STYLES[company.isMailSent ? "Yes" : "No"],
              )}
            >
              {company.isMailSent ? "Yes" : "No"}
            </Badge>
          </span>
        </div>
      );
    },
  },
];

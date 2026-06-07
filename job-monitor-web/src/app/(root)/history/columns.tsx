"use client";

import { ExecutionHistory } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";

const formatFailure = (value?: string) =>
  value
    ?.replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase()) ?? "—";

export const columns: ColumnDef<ExecutionHistory>[] = [
  { accessorKey: "taskName", header: "Task Name", minSize: 170 },
  { accessorKey: "jobName", header: "Job Name", minSize: 170 },
  { accessorKey: "jobUser", header: "Job User", minSize: 100 },
  { accessorKey: "company", header: "Company", minSize: 100, size: 100 },
  { accessorKey: "server", header: "Server" },
  {
    accessorKey: "cause",
    header: "Failure Reason",
    cell: ({ getValue }) => (
      <span className="truncate block max-w-40">
        {formatFailure(getValue() as string)}
      </span>
    ),
    minSize: 100,
  },
  {
    accessorKey: "executedOn",
    header: "Executed On",
    cell: ({ getValue }) => {
      const v = getValue<string>();
      return v ? new Date(v).toLocaleString() : "";
    },
    minSize: 150,
  },
  {
    accessorKey: "terminatedOn",
    header: "Terminated On",
    cell: ({ getValue }) => {
      const v = getValue<string>();
      return v ? new Date(v).toLocaleString() : "";
    },
    minSize: 150,
  },
  {
    accessorKey: "isMailSent",
    header: "Mail Sent",
    cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "No"),
    size: 100,
    minSize: 100,
  },
];

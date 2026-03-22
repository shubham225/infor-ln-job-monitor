"use client";

import { ExecutionHistory } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";

const formatFailure = (value?: string) =>
  value
    ?.replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase()) ?? "—";

export const columns: ColumnDef<ExecutionHistory>[] = [
  { accessorKey: "taskName", header: "Task Name",
    minSize: 70, },
  { accessorKey: "jobName", header: "Job Name",
    minSize: 70, },
  { accessorKey: "jobUser", header: "Job User",
    minSize: 70, },
  { accessorKey: "company", header: "Company" ,
    minSize: 70,},
  { accessorKey: "server", header: "Server" },
  {
    accessorKey: "cause",
    header: "Failure Reason",
    cell: ({ getValue }) => (
      <span className="truncate block max-w-[160px]">
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
    size:200,
    minSize: 200,
  },
  // {
  //   accessorKey: "terminatedOn",
  //   header: "Terminated On",
  //   cell: ({ getValue }) => {
  //     const v = getValue<string>();
  //     return v ? new Date(v).toLocaleString() : "";
  //   },
  {
    accessorKey: "isMailSent",
    header: "Mail Sent",
    cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "No"),
    size: 80,
    minSize: 80,
  },
];

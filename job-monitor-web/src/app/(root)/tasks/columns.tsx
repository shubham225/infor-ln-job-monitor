"use client";

import { RunningTask } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<RunningTask>[] = [
  {
    accessorKey: "taskName",
    header: "Task Name",
    minSize: 170
  },
  {
    accessorKey: "status",
    header: "Monitoring Status",
    minSize: 150
  },
  {
    accessorKey: "executedOn",
    header: "Executed On",
    cell: ({ getValue }) => {
      const v = getValue<string>();
      return v ? new Date(v).toLocaleString() : "";
    },
    minSize: 150,
    size: 150
  },
  {
    accessorKey: "jobName",
    header: "Job Name",
    minSize: 170
  },
  {
    accessorKey: "company",
    header: "Company",
    minSize: 100,
    size: 100
  },
  {
    accessorKey: "server",
    header: "Server",
    minSize: 100
  },
  {
    accessorKey: "jobStatus",
    header: "Job Status",
    minSize: 100
  },
  {
    accessorKey: "jobUser",
    header: "Job User",
    minSize: 100
  },
  {
    accessorKey: "jobStartedAt",
    header: "Job Started At",
    cell: ({ getValue }) => {
      const v = getValue<string>();
      return v ? new Date(v).toLocaleString() : "";
    },
    minSize: 150,
    size: 170
  },
];

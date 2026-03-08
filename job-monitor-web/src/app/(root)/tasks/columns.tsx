"use client";

import { RunningTask } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<RunningTask>[] = [
  {
    accessorKey: "taskName",
    header: "Task Name",
  },
  {
    accessorKey: "jobName",
    header: "Job Name",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "server",
    header: "Server",
  },
  {
    accessorKey: "jobStatus",
    header: "Job Status",
  },
  {
    accessorKey: "jobUser",
    header: "Job User",
  },
  {
    accessorKey: "jobStartedAt",
    header: "Job Started At",
  },
  {
    accessorKey: "status",
    header: "Monitoring Status",
  },
  {
    accessorKey: "executedOn",
    header: "Executed On",
  },
];

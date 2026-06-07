"use client";

import { DataTable } from "@/components/data-table-custom";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { RunningTask } from "@/types/api";
import { fetchAllRunningTasks } from "@/service/monitor-service";
import { Button } from "@/components/ui/button";
import { IconArrowsDiagonal, IconReload } from "@tabler/icons-react";


export default function Tasks() {
  const [runningTasks, setRunningTasks] = useState<RunningTask[] | []>([]);

  const refreshTable = async () => {
    console.log("Refreshing...");
    const response = await fetchAllRunningTasks();
    setRunningTasks(response);
    console.log("response runningtask", response);
  };

  useEffect(() => {
    // initial load
    refreshTable();

    // auto refresh every 15 seconds
    const interval = setInterval(() => {
      refreshTable();
    }, 10000);

    // cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 space-y-4 bg-background">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Running Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor all currently running job execution tasks in real-time.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              refreshTable();
            }}
            aria-label="Refresh"
          >
            <IconReload size={18} />
          </Button>
          <Button variant="outline" size="icon" aria-label="Export">
            <IconArrowsDiagonal size={18} />
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <DataTable
        columns={columns}
        data={runningTasks}
        refreshTable={refreshTable}
      />
    </div>
  );
}

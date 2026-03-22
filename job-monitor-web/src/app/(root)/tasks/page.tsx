"use client";

import { DataTable } from "@/components/data-table-custom";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { RunningTask } from "@/types/api";
import { fetchAllRunningTasks } from "@/service/monitor-service";
import { Button } from "@/components/ui/button";
import { IconArrowsDiagonal, IconMenu2, IconReload } from "@tabler/icons-react";

type Props = {};

export default function Tasks({}: Props) {
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
    <div className="space-y-1 p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold"></h1>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              refreshTable();
            }}
          >
            <IconReload />
          </Button>
          <Button variant="ghost" size="icon">
            <IconArrowsDiagonal />
          </Button>
          <Button variant="ghost" size="icon">
            <IconMenu2 />
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={runningTasks}
        refreshTable={refreshTable}
      />
    </div>
  );
}

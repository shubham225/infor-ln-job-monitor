"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table-custom";
import { ExecutionHistory } from "@/types/api";
import { fetchAllMonitorHistory } from "@/service/monitor-service";
import { Button } from "@/components/ui/button";
import { IconArrowsDiagonal, IconReload } from "@tabler/icons-react";

export default function History() {
  const [executionHistory, setExecutionHistory] = useState<
    ExecutionHistory[] | []
  >([]);

  const fetchAllMonitorHistoryAsync = async () => {
    const response = await fetchAllMonitorHistory();
    setExecutionHistory(response);
  };

  useEffect(() => {
    fetchAllMonitorHistoryAsync();
  }, []);

  return (
    <div className="p-4 space-y-4 bg-background">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Execution History</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View historical records of all job executions with detailed status
            and performance metrics.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              fetchAllMonitorHistoryAsync();
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
      <DataTable columns={columns} data={executionHistory} />
    </div>
  );
}

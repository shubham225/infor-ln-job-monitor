"use client";

import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table-custom";
import { ExecutionHistory } from "@/types/api";
import { initExecutionHistory } from "@/constants/init-data";
import { fetchAllMonitorHistory } from "@/service/monitor-service";
import { Button } from "@/components/ui/button";
import { IconArrowsDiagonal, IconMenu2, IconReload } from "@tabler/icons-react";

type Props = {};

export default function History({}: Props) {
  const [executionHistory, setExecutionHistory] = useState<
    ExecutionHistory[] | []
  >([]);

  const fetchAllMonitorHistoryAsync = async () => {
    const response = await fetchAllMonitorHistory();
    setExecutionHistory(response);
    console.log("response mapping", response);
  };

  useEffect(() => {
    fetchAllMonitorHistoryAsync();
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
              fetchAllMonitorHistoryAsync();
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
      <DataTable columns={columns} data={executionHistory} />
    </div>
  );
}

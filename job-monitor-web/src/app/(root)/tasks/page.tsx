"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { RunningTask } from "@/types/api";
import { fetchAllRunningTasks } from "@/service/monitor-service";
import { Button } from "@/components/ui/button";
import { IconArrowsDiagonal, IconReload } from "@tabler/icons-react";
import { DataTableProvider } from "@/components/data-table/data-table-context";
import { TablePagination } from "@/components/data-table/data-table-pagination";
import { TableFilter } from "@/components/data-table/table-filter";
import { TableActions } from "@/components/data-table/table-actions";
import { DataTableView } from "@/components/data-table/data-table-view";
import { DataTableCardGrid } from "@/components/data-table/data-table-card-grid";
import { DataTable } from "@/components/data-table/data-table";


export default function Tasks() {
  const [runningTasks, setRunningTasks] = useState<RunningTask[] | []>([]);

  const refreshTable = async () => {
    const response = await fetchAllRunningTasks();
    setRunningTasks(response);
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
    <div className="space-y-4 bg-background">
      {/* Table Card */}
      <DataTableProvider
        columns={columns}
        data={runningTasks}
        pageSize={15}
      >
        <div className="flex flex-col overflow-hidden bg-muted/20">
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 bg-background px-4 py-2.5">
              <TableFilter showAskAI={false} showViewToggle={false} />
              <TableActions showAddNew={false} showViewSettings={true} />
            </div>

            <DataTableView
              table={<DataTable className="flex-1" />}
              card={
                <DataTableCardGrid
                  className=""
                  renderCard={(row) => (<div/>)}
                />
              }
            />
            {runningTasks.length > 9 && <TablePagination />}
          </div>
        </div>
      </DataTableProvider>
    </div>
  );
}

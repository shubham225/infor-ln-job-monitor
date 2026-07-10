"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { TaskJobMapping } from "@/types/api";
import { fetchTaskJobMapping } from "@/service/monitor-service";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableProvider } from "@/components/data-table/data-table-context";
import { TableFilter } from "@/components/data-table/table-filter";
import { DataTableView } from "@/components/data-table/data-table-view";
import { TablePagination } from "@/components/data-table/data-table-pagination";
import { TableActions } from "@/components/data-table/table-actions";
import { DataTableCardGrid } from "@/components/data-table/data-table-card-grid";

export default function History() {
  const [taskJobMapping, setTaskJobMapping] = useState<
    TaskJobMapping[] | []
  >([]);

  const fetchTaskJobMappingAsync = async () => {
    const response = await fetchTaskJobMapping();
    setTaskJobMapping(response);
  };

  useEffect(() => {
    fetchTaskJobMappingAsync();
  }, []);

  return (
    <div className="bg-background">
      {/* Table / Card */}
      <DataTableProvider
        columns={columns}
        data={taskJobMapping}
        pageSize={14}
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
                <DataTableCardGrid className="" renderCard={() => <div />} />
              }
            />

            {taskJobMapping.length > 9 && (
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 bg-background py-2">
                <TablePagination />
              </div>
            )}
          </div>
        </div>
      </DataTableProvider>
    </div>
  );
}

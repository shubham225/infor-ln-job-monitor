import apiClient from "@/lib/axios-client";
import { BackendResponse } from "@/types";
import { ExecutionHistory, RunningTask, TaskJobMapping } from "@/types/api";
import { ERPJobStatus, TaskSchedulerStatus } from "@/types/enums";

export async function fetchAllMonitorHistory(): Promise<ExecutionHistory[]> {
  try {
    const response =
      await apiClient.get<BackendResponse<ExecutionHistory[]>>(
        `/monitor/history`,
      );

    return response.data.payload;
  } catch (error) {
    console.error("Failed to fetch monitoring history:", error);
    throw error;
  }
}

export async function fetchAllRunningTasks(): Promise<RunningTask[]> {
  try {
    const response =
      await apiClient.get<BackendResponse<RunningTask[]>>(`/monitor`);

    return response.data.payload;
  } catch (error) {
    console.error("Failed to fetch running tasks:", error);
    throw error;
  }
}

export async function fetchTaskJobMapping(): Promise<TaskJobMapping[]> {
  try {
    // const response = await apiClient.get<BackendResponse<TaskJobMapping[]>>(
    //   `/monitor/taskJobMapping`
    // );

    // return response.data.payload;

    return [
      {
        hostName: "ERP-SRV-01",
        taskName: "Daily Invoice Sync",
        jobName: "INV_SYNC",
        company: "Acme Corp",
      },
      {
        hostName: "ERP-SRV-01",
        taskName: "Customer Import",
        jobName: "CUST_IMPORT",
        company: "Acme Corp",
      },
      {
        hostName: "ERP-SRV-02",
        taskName: "Stock Reconciliation",
        jobName: "STOCK_RECON",
        company: "Globex Ltd",
      },
      {
        hostName: "ERP-SRV-02",
        taskName: "Sales Report Generation",
        jobName: "SALES_REPORT",
        company: "Globex Ltd",
      },
      {
        hostName: "ERP-SRV-03",
        taskName: "Backup Database",
        jobName: "DB_BACKUP",
        company: "Wayne Enterprises",
      },
      {
        hostName: "ERP-SRV-03",
        taskName: "Payroll Export",
        jobName: "PAYROLL_EXPORT",
        company: "Wayne Enterprises",
      },
      {
        hostName: "ERP-SRV-04",
        taskName: "Email Notifications",
        jobName: "EMAIL_NOTIFY",
        company: "Stark Industries",
      },
      {
        hostName: "ERP-SRV-04",
        taskName: "Order Processing",
        jobName: "ORDER_PROCESS",
        company: "Stark Industries",
      },
      {
        hostName: "ERP-SRV-05",
        taskName: "Data Warehouse Sync",
        jobName: "DWH_SYNC",
        company: "Umbrella Corp",
      },
      {
        hostName: "ERP-SRV-05",
        taskName: "Inventory Update",
        jobName: "INV_UPDATE",
        company: "Umbrella Corp",
      },
    ];
  } catch (error) {
    console.error("Failed to fetch monitoring history:", error);
    throw error;
  }
}

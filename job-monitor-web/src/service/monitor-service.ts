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
    const response = await apiClient.get<BackendResponse<TaskJobMapping[]>>(
      `/monitor/taskJobMapping`
    );

    return response.data.payload;
  } catch (error) {
    console.error("Failed to fetch monitoring history:", error);
    throw error;
  }
}

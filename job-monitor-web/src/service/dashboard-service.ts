import apiClient from "@/lib/axios-client";
import { BackendResponse } from "@/types";
import { DashboardStats, MonthlyExecutionTrend } from "@/types/api";

// Message Exclusions 
export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const response = await apiClient.get<BackendResponse<DashboardStats>>(
      `/dashboard/stats`
    );
    return response.data.payload;

  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    throw error;
  }
}

export async function fetchMonthlyExecutionTrend(): Promise<MonthlyExecutionTrend[]> {
  try {
    const response = await apiClient.get<BackendResponse<MonthlyExecutionTrend[]>>(
      `/dashboard/monthlyTrend`
    );
    return response.data.payload;
  } catch (error) {
    console.error("Failed to fetch monthly execution trend:", error);
    throw error;
  }
}

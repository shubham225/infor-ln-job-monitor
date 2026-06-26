import apiClient from "@/lib/axios-client";
import { BackendResponse } from "@/types";
import { AppSetting } from "@/types/api";

export async function fetchAppSettings(): Promise<AppSetting> {
  try {
    const response = await apiClient.get<BackendResponse<AppSetting>>(
      `/settings`
    );

    return response.data.payload;
  } catch (error) {
    console.error("Failed to fetch app settings:", error);
    throw error;
  }
}

export async function updateOrSaveAppSettings(
  settingsRequest: AppSetting
): Promise<AppSetting> {
  try {
    const response = await apiClient.post<BackendResponse<AppSetting>>(
      `/settings`,
      settingsRequest
    );
    
    return response.data.payload;
  } catch (error) {
    console.error("Failed to update or save app settings:", error);
    throw error;
  }
}


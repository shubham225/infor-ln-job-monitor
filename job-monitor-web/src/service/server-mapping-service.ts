import apiClient from "@/lib/axios-client";
import { BackendResponse } from "@/types";
import { ServerMapping } from "@/types/api";

export async function fetchServerMappings(): Promise<ServerMapping[]> {
  try {
    const response = await apiClient.get<BackendResponse<ServerMapping[]>>(
      `/mappings`
    );

    return response.data.payload;
  } catch (error) {
    console.error("Failed to fetch Server Mappings:", error);
    throw error;
  }
}

export async function addServerMappings(
  mappingRequest: ServerMapping
): Promise<ServerMapping> {
  try {
    const response = await apiClient.post<BackendResponse<ServerMapping>>(
      `/mappings`,
      mappingRequest
    );
    
    return response.data.payload;
  } catch (error) {
    console.error("Failed to add server mapping:", error);
    throw error;
  }
}

export async function updateServerMappings(
  mappingId: string,
  mappingRequest: ServerMapping
): Promise<ServerMapping> {
  try {
    const response = await apiClient.post<BackendResponse<ServerMapping>>(
      `/mappings/${mappingId}`,
      mappingRequest
    );
    
    return response.data.payload;
  } catch (error) {
    console.error("Failed to update server mapping:", error);
    throw error;
  }
}

export async function deleteServerMappings(
  mappingId: string
): Promise<ServerMapping> {
  try {
    const response = await apiClient.delete<BackendResponse<ServerMapping>>(
      `/mappings/${mappingId}`
    );
    
    return response.data.payload;
  } catch (error) {
    console.error("Failed to update server mapping:", error);
    throw error;
  }
}
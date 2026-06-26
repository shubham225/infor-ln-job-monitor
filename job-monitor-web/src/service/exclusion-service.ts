import apiClient from "@/lib/axios-client";
import { BackendResponse } from "@/types";
import { ExclusionJob, ExclusionJobStatus, ExclusionMessage } from "@/types/api";

// Message Exclusions 
export async function fetchExclusionMessages(): Promise<ExclusionMessage[]> {
  try {
    const response = await apiClient.get<BackendResponse<ExclusionMessage[]>>(
      `/exclusion/message`
    );
    return response.data.payload;
  } catch (error) {
    console.error("Failed to fetch exclusion messages:", error);
    throw error;
  }
}

export async function addExclusionMessage(
  messageExclusionRequest: ExclusionMessage
): Promise<ExclusionMessage> {
  try {
    const response = await apiClient.post<BackendResponse<ExclusionMessage>>(
      `/exclusion/message`,
      messageExclusionRequest
    );
    
    return response.data.payload;
  } catch (error) {
    console.error("Failed to add exclusion message:", error);
    throw error;
  }
}

export async function deleteExclusionMessage(
  messageId: number
): Promise<ExclusionMessage> { 
  try {
    const response = await apiClient.delete<BackendResponse<ExclusionMessage>>(
      `/exclusion/message/${messageId}`
    );
    return response.data.payload;
  } catch (error) {
    console.error("Failed to delete exclusion message:", error);
    throw error;
  }
}

// Job Exclusions
export async function fetchExclusionJobs(): Promise<ExclusionJob[]> {
  try {
    const response = await apiClient.get<BackendResponse<ExclusionJob[]>>(
      `/exclusion/job`
    );
    return response.data.payload;
  } catch (error) {
    console.error("Failed to fetch exclusion jobs:", error);
    throw error;
  }
}

export async function addExclusionJob(
  jobExclusionRequest: ExclusionJob
): Promise<ExclusionJob> {
  try {
    const response = await apiClient.post<BackendResponse<ExclusionJob>>(
      `/exclusion/job`,
      jobExclusionRequest
    );
    
    return response.data.payload;
  } catch (error) {
    console.error("Failed to add exclusion job:", error);
    throw error;
  }
}

export async function deleteExclusionJob(
  jobId: number
): Promise<ExclusionJob> { 
  try {
    const response = await apiClient.delete<BackendResponse<ExclusionJob>>(
      `/exclusion/job/${jobId}`
    );
    return response.data.payload;
  } catch (error) {
    console.error("Failed to delete exclusion job:", error);
    throw error;
  }
}

// Job Status Exclusions
export async function fetchExclusionJobStatuses(): Promise<ExclusionJobStatus[]> {
  try {
    const response = await apiClient.get<BackendResponse<ExclusionJobStatus[]>>(
      `/exclusion/jobStatus`
    );
    return response.data.payload;
  } catch (error) {
    console.error("Failed to fetch exclusion job statuses:", error);
    throw error;
  }
}

export async function addExclusionJobStatus(
  jobStatusExclusionRequest: ExclusionJobStatus
): Promise<ExclusionJobStatus> {
  try {
    const response = await apiClient.post<BackendResponse<ExclusionJobStatus>>(
      `/exclusion/jobStatus`,
      jobStatusExclusionRequest
    );
    
    return response.data.payload;
  } catch (error) {
    console.error("Failed to add exclusion job status:", error);
    throw error;
  }
}

export async function deleteExclusionJobStatus(
  jobStatusId: number
): Promise<ExclusionJobStatus> {
  try {
    const response = await apiClient.delete<BackendResponse<ExclusionJobStatus>>(
      `/exclusion/jobStatus/${jobStatusId}`
    );
    return response.data.payload;
  } catch (error) {
    console.error("Failed to delete exclusion job status:", error);
    throw error;
  }
} 
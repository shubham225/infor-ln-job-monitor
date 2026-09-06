import { ERPJobStatus, FailureReason, TaskSchedulerStatus } from ".";
import { settingsSchema } from "./zod-schemas";

export type AppSetting = z.infer<typeof settingsSchema>;

export type ServerMapping = {
  id: string;
  hostname: string;
  apiUrl: string;
};

export type ExecutionHistory = {
  jobName: string;
  jobUser: string;
  company: string;
  server: string;
  serverName: string;
  jobStatus: ERPJobStatus;
  jobStartedAt: string;
  jobEndedAt: string;
  taskName: string;
  taskStatus: TaskSchedulerStatus;
  cause: FailureReason | null;
  executedOn: string;
  terminatedOn: string;
  isMailSent: boolean;
};

export interface RunningTask {
  taskName: string;
  jobName: string;
  company: string;
  server: string;
  jobStatus: ERPJobStatus;
  jobUser: string;
  jobStartedAt: string; // ISO string from LocalDateTime
  status: MonitoringStatus;
  executedOn: string;
}

export interface ExclusionMessage {
  id: number;
  hostName: string;
  message: string;
}

export interface ExclusionJob {
  id: number;
  hostName: string;
  jobName: string;
  company: string;
}

export interface ExclusionJobStatus {
  id: number;
  hostName: string;
  status: ERPJobStatus;
}

export interface DashboardStats {
  summery: {
    totalJobExecutions: number;
    totalFailedJobs: number;
    totalSuccessfulJobs: number;
    totalRunningJobs: number;
  };
  failedJobsByReason: FailedJobsByReason[];
  quickStats: {
    averageExecutionTimeMs: number;
    lastAlertTime: string;
    activeJobs: number;
    uptimeMs: number;
    scheduledTasks: number;
  };
}

export interface FailedJobsByReason {
  reason: FailureReason;
  count: number;
}

export interface MonthlyExecutionTrend {
  month: string;
  successfulExecutions: number;
  failedExecutions: number;
}

export type TaskJobMapping = {
  hostName: string;
  taskName: string;
  jobName: string;
  company: string;
};

export interface User {
  name: string;
  email: string;
}
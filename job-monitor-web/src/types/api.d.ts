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
    totalRunningTasks: number;
  };
  failedJobsByReason: [
    {
      reason: FailureReason;
      count: number;
    },
  ];
  quickStats: {
    averageExecutionTime: number;
    lastAlertTime: string;
    activeJobs: number;
    uptime: string;
    scheduledTasks: number;
  };
  monthlyExecutionTrend: MonthlyExecutionTrend[];
}

export interface MonthlyExecutionTrend {
  month: string;
  successfulExecutions: number;
  failedExecutions: number;
}
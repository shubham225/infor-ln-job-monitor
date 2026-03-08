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
  jobStartedAt: string;  // ISO string from LocalDateTime
  status: MonitoringStatus;
  executedOn: string;
}
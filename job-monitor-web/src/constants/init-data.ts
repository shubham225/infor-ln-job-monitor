
import { AppSetting, ExecutionHistory, RunningTask, ServerMapping } from "@/types/api";
import { ERPJobStatus, TaskSchedulerStatus } from "@/types/enums";

export const initAppSettings: AppSetting = {
  mailTo: "",
  mailCc: "",
  emailAlerts: true,
  allowedJobStartDelay: 0,
};

export const initServerMapping: ServerMapping = {
  id: "",
  hostName: "",
  apiUrl: "",
};

export const initServerMappings: ServerMapping[] = [
  {
    id: "",
    hostName: "",
    apiUrl: "",
  },
];

export const initExecutionHistory: ExecutionHistory[] = [
  {
    jobName: "",
    jobUser: "",
    company: "",
    server: "",
    serverName: "",
    jobStatus: ERPJobStatus.UNKNOWN,
    jobStartedAt: "",
    jobEndedAt: "",
    taskName: "",
    taskStatus: TaskSchedulerStatus.UNKNOWN,
    cause: null,
    executedOn: "",
    terminatedOn: "",
    isMailSent: false,
  },
];

export const initRunningTasks: RunningTask[] = [
  {
    taskName: "",
    jobName: "",
    company: "",
    server: "",
    jobStatus: ERPJobStatus.UNKNOWN,
    jobUser: "",
    jobStartedAt: "",
    status: TaskSchedulerStatus.UNKNOWN,
    executedOn: "",
  },
];
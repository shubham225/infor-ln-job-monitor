import { ERPJobStatus, FailureReason, TaskSchedulerStatus } from "@/types/enums";

export const FAILURE_REASON_STYLES: Record<FailureReason, string> = {
  PENDING: "border-0 bg-sky-50 text-sky-700 border-sky-200",
  SCHEDULER_RUNNING: "border-0 bg-sky-50 text-sky-700 border-sky-200",
  SKIPPED: "border-0 bg-slate-50 text-slate-700 border-slate-200",

  PARENT_EXIT: "border-0 bg-indigo-50 text-indigo-700 border-indigo-200",
  BW_CONFIG_MISSING: "border-0 bg-indigo-50 text-indigo-700 border-indigo-200",
  ERP_API_DOWN: "border-0 bg-indigo-50 text-indigo-700 border-indigo-200",

  NOT_FOUND: "border-0 bg-amber-50 text-amber-700 border-amber-200",
  NOT_EXECUTED: "border-0 bg-amber-50 text-amber-700 border-amber-200",
  CANCELED: "border-0 bg-amber-50 text-amber-700 border-amber-200",

  RUNTIME_ERROR: "border-0 bg-red-50 text-red-700 border-red-200",
  EXECUTED_WITH_RUNTIME_ERROR: "border-0 bg-red-50 text-red-700 border-red-200",
  TIME_LIMIT_EXCEEDED: "border-0 bg-red-50 text-red-700 border-red-200",

  EXECUTED: "border-0 bg-green-50 text-green-700 border-green-200",
};

export const YES_NO_STYLES: Record<string, string> = {
  Yes: "bg-emerald-50 text-emerald-700 border-emerald-200",
  No: "bg-rose-50 text-rose-700 border-rose-200",
};

export const JOB_STATUS_STYLE: Record<ERPJobStatus, string> = {
  [ERPJobStatus.FREE]: "bg-green-50 text-green-700 border-green-200",
  [ERPJobStatus.WAITING]: "bg-yellow-50 text-yellow-700 border-yellow-200",
  [ERPJobStatus.RUNNING]: "bg-blue-50 text-blue-700 border-blue-200",
  [ERPJobStatus.CANCELED]: "bg-gray-50 text-gray-700 border-gray-200",
  [ERPJobStatus.RUNTIME_ERROR]: "bg-red-50 text-red-700 border-red-200",
  [ERPJobStatus.IN_QUEUE]: "bg-purple-50 text-purple-700 border-purple-200",
  [ERPJobStatus.BLOCKED]: "border-orange-500 text-orange-500",
  [ERPJobStatus.UNKNOWN]: "border-gray-500 text-gray-500",
};

export const MONITOR_STATUS_STYLE: Record<TaskSchedulerStatus, string> = {
  [TaskSchedulerStatus.READY]: "bg-sky-50 text-sky-700 border-sky-200",
  [TaskSchedulerStatus.RUNNING]: "bg-green-50 text-green-700 border-green-200",
  [TaskSchedulerStatus.PAUSED]:
    "bg-yellow-50 text-yellow-700 border-yellow-200",
  [TaskSchedulerStatus.DISABLED]: "bg-gray-50 text-gray-700 border-gray-200",
  [TaskSchedulerStatus.QUEUED]:
    "bg-purple-50 text-purple-700 border-purple-200",
  [TaskSchedulerStatus.WAITING]: "bg-blue-50 text-blue-700 border-blue-200",
  [TaskSchedulerStatus.IDLE]: "bg-gray-50 text-gray-700 border-gray-200",
  [TaskSchedulerStatus.TERMINATED]: "bg-red-50 text-red-700 border-red-200",
  [TaskSchedulerStatus.MISSED]:
    "bg-orange-50 text-orange-700 border-orange-200",
  [TaskSchedulerStatus.NO_MORE_RUNS]:
    "bg-gray-50 text-gray-700 border-gray-200",
  [TaskSchedulerStatus.NOT_SCHEDULED]:
    "bg-gray-50 text-gray-700 border-gray-200",
  [TaskSchedulerStatus.TRANSITION]:
    "bg-yellow-50 text-yellow-700 border-yellow-200",
  [TaskSchedulerStatus.COULD_NOT_START]:
    "bg-red-50 text-red-700 border-red-200",
  [TaskSchedulerStatus.HAS_NOT_RUN]: "bg-gray-50 text-gray-700 border-gray-200",
  [TaskSchedulerStatus.UNKNOWN]: "bg-gray-50 text-gray-700 border-gray-200",
  [TaskSchedulerStatus.PENDING]:
    "bg-yellow-50 text-yellow-700 border-yellow-200",
};

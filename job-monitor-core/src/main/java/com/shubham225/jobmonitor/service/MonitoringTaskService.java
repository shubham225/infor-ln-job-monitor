package com.shubham225.jobmonitor.service;

import com.shubham225.jobmonitor.model.entity.InforERPJob;
import com.shubham225.jobmonitor.model.entity.MonitoringTask;

import java.util.List;

public interface MonitoringTaskService {
    MonitoringTask createMonitorTask(InforERPJob job);
    MonitoringTask saveMonitorTask(MonitoringTask monitoringTask);
    List<MonitoringTask> findActiveMonitoringTasks();
    void archiveMonitoringTask(MonitoringTask task);
    void validateAndNotifyTaskExecution(MonitoringTask monitoringTask);
}

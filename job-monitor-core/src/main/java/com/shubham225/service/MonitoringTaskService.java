package com.shubham225.service;

import com.shubham225.model.entity.InforERPJob;
import com.shubham225.model.entity.MonitoringTask;

import java.util.List;

public interface MonitoringTaskService {
    MonitoringTask createMonitorTask(InforERPJob job);
    MonitoringTask saveMonitorTask(MonitoringTask monitoringTask);
    List<MonitoringTask> findActiveMonitoringTasks();
    void archiveMonitoringTask(MonitoringTask task);
    void validateAndNotifyTaskExecution(MonitoringTask monitoringTask);
}

package com.shubham225.service;

import com.shubham225.model.entity.InforERPJob;
import com.shubham225.model.entity.MonitoringTask;

import java.util.List;

public interface MonitoringTaskService {
    public MonitoringTask createMonitorTask(InforERPJob job);
    public MonitoringTask saveMonitorTask(MonitoringTask monitoringTask);
    public List<MonitoringTask> findActiveMonitoringTasks();
    public void archiveMonitoringTask(MonitoringTask task);
    public void validateAndNotifyTaskExecution(MonitoringTask monitoringTask);
}

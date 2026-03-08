package com.shubham225.service;

import com.shubham225.model.entity.MonitoringTaskHistory;

import java.util.List;

public interface MonitoringTaskHistoryService {
    public MonitoringTaskHistory saveMonitoringTaskHistory(MonitoringTaskHistory history);
    public List<MonitoringTaskHistory> findAllMonitoringTaskHistory();
}

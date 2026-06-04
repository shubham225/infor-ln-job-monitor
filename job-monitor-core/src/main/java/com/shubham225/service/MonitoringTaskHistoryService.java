package com.shubham225.service;

import com.shubham225.model.entity.MonitoringTaskHistory;

import java.util.List;

public interface MonitoringTaskHistoryService {
    MonitoringTaskHistory saveMonitoringTaskHistory(MonitoringTaskHistory history);
    List<MonitoringTaskHistory> findAllMonitoringTaskHistory();
}

package com.shubham225.jobmonitor.service;

import com.shubham225.jobmonitor.model.entity.MonitoringTaskHistory;

import java.util.List;

public interface MonitoringTaskHistoryService {
    MonitoringTaskHistory saveMonitoringTaskHistory(MonitoringTaskHistory history);
    List<MonitoringTaskHistory> findAllMonitoringTaskHistory();
}

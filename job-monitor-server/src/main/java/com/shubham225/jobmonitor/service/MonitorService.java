package com.shubham225.jobmonitor.service;

import com.shubham225.jobmonitor.model.dto.*;

import java.util.List;

public interface MonitorService {
    MonitorResponseDTO createMonitoringTask(MonitorRequestDTO request);
    List<RunningTaskDTO> getMonitoringTasks();
    List<ExecutionHistoryDTO> getMonitoringHistory();
    List<TaskJobMappingDTO> getTaskJobMappings();
}

package com.shubham225.service;

import com.shubham225.model.dto.*;

import java.util.List;

public interface MonitorService {
    MonitorResponseDTO createMonitoringTask(MonitorRequestDTO request);
    List<RunningTaskDTO> getMonitoringTasks();
    List<ExecutionHistoryDTO> getMonitoringHistory();
    List<TaskJobMappingDTO> getTaskJobMappings();
}

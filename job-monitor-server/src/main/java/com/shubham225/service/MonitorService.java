package com.shubham225.service;

import com.shubham225.model.dto.ExecutionHistoryDTO;
import com.shubham225.model.dto.MonitorRequestDTO;
import com.shubham225.model.dto.MonitorResponseDTO;
import com.shubham225.model.dto.RunningTaskDTO;

import java.util.List;

public interface MonitorService {
    MonitorResponseDTO createMonitoringTask(MonitorRequestDTO request);
    List<RunningTaskDTO> getMonitoringTasks();
    List<ExecutionHistoryDTO> getMonitoringHistory();
}

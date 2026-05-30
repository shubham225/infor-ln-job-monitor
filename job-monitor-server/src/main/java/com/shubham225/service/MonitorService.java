package com.shubham225.service;

import com.shubham225.model.dto.ExecutionHistoryDTO;
import com.shubham225.model.dto.MonitorRequestDTO;
import com.shubham225.model.dto.MonitorResponseDTO;
import com.shubham225.model.dto.RunningTaskDTO;

import java.util.List;

public interface MonitorService {
    public MonitorResponseDTO createMonitoringTask(MonitorRequestDTO request);
    public List<RunningTaskDTO> getMonitoringTasks();
    public List<ExecutionHistoryDTO> getMonitoringHistory();
}

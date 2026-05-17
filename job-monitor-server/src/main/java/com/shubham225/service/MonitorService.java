package com.shubham225.service;

import com.shubham225.model.dto.ExecutionHistoryDTO;
import com.shubham225.model.dto.MonitorRequestDTO;
import com.shubham225.model.dto.MonitorResponseDTO;
import com.shubham225.model.dto.RunningTaskDTO;

import java.util.List;

public interface MonitorService {
    public MonitorResponseDTO addJobToMonitoringQueue(MonitorRequestDTO request);
    public List<RunningTaskDTO> getMonitoringQueue();
    public List<ExecutionHistoryDTO> getMonitoringHistory();
}

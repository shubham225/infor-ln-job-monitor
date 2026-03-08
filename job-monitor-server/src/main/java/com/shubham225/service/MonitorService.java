package com.shubham225.service;

import com.shubham225.model.dto.ExecHistoryDTO;
import com.shubham225.model.dto.MonitorReqDTO;
import com.shubham225.model.dto.MonitorRespDTO;
import com.shubham225.model.dto.RunningTasksDTO;

import java.util.List;

public interface MonitorService {
    public MonitorRespDTO addJobToMonitoringQueue(MonitorReqDTO request);
    public List<RunningTasksDTO> getMonitoringQueue();
    public List<ExecHistoryDTO> getMonitoringHistory();
}

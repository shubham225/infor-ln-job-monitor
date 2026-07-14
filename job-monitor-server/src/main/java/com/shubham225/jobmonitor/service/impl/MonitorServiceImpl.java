package com.shubham225.jobmonitor.service.impl;

import com.shubham225.jobmonitor.model.dto.*;
import com.shubham225.jobmonitor.service.*;
import com.shubham225.jobmonitor.model.entity.InforERPJob;
import com.shubham225.jobmonitor.model.entity.MonitoringTask;
import com.shubham225.jobmonitor.model.mapper.MonitorHistoryMapper;
import com.shubham225.jobmonitor.model.mapper.MonitorTaskMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MonitorServiceImpl implements MonitorService {
    private final JobService jobService;
    private final MonitoringTaskService monitorService;
    private final MonitorTaskMapper monitorTaskMapper;
    private final MonitoringTaskHistoryService monitoringTaskHistoryService;
    private final MonitorHistoryMapper monitorHistoryMapper;
    private final WinTaskToJobMappingService winTaskToJobMappingService;

    @Override
    public MonitorResponseDTO createMonitoringTask(MonitorRequestDTO request) {
        log.info("Adding Job {} [{} - Co. {}] to monitoring queue",
                request.getJobCode(), request.getHostName(), request.getCompany());

        InforERPJob job = jobService.createInforERPJob(
                                                    request.getJobCode(),
                                                    request.getCompany(),
                                                    request.getHostName());

        MonitoringTask task = monitorService.createMonitorTask(job);

        log.info("Monitoring task {} created with status {}",task.getId(), task.getStatus());

        return MonitorResponseDTO.builder()
                .monitorTaskId(task.getId())
                .status(task.getStatus())
                .build();
    }

    @Override
    public List<RunningTaskDTO> getMonitoringTasks() {
        List<MonitoringTask> runningTasks = monitorService.findActiveMonitoringTasks();
        return runningTasks.stream().map(monitorTaskMapper::toDTO).toList();
    }

    @Override
    public List<ExecutionHistoryDTO> getMonitoringHistory() {
        return monitoringTaskHistoryService.findAllMonitoringTaskHistory().stream()
                .map(monitorHistoryMapper::toDTO).toList();
    }

    @Override
    public List<TaskJobMappingDTO> getTaskJobMappings() {
        return winTaskToJobMappingService.getTaskJobMappings();
    }
}

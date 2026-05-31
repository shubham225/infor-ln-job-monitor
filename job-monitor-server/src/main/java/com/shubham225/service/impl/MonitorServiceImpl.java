package com.shubham225.service.impl;

import com.shubham225.model.dto.ExecutionHistoryDTO;
import com.shubham225.model.dto.MonitorRequestDTO;
import com.shubham225.model.dto.MonitorResponseDTO;
import com.shubham225.model.dto.RunningTaskDTO;
import com.shubham225.model.entity.InforERPJob;
import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.model.mapper.MonitorHistoryMapper;
import com.shubham225.model.mapper.MonitorTaskMapper;
import com.shubham225.service.JobService;
import com.shubham225.service.MonitorService;
import com.shubham225.service.MonitoringTaskHistoryService;
import com.shubham225.service.MonitoringTaskService;
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
}

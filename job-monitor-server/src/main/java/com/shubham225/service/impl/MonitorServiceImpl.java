package com.shubham225.service.impl;

import com.shubham225.model.dto.ExecHistoryDTO;
import com.shubham225.model.dto.MonitorReqDTO;
import com.shubham225.model.dto.MonitorRespDTO;
import com.shubham225.model.dto.RunningTasksDTO;
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
    public MonitorRespDTO addJobToMonitoringQueue(MonitorReqDTO request) {
        log.info("Adding Job {}-{}-{} to monitoring queue",
                request.getBwHostName(), request.getJobName(), request.getBseCompany());

        InforERPJob job = jobService.findOrCreateJob(
                                                    request.getJobName(),
                                                    request.getBseCompany(),
                                                    request.getBwHostName());
        MonitoringTask task = monitorService.createMonitorTask(job);

        log.info("Monitoring task {} created with status {}",task.getId(), task.getStatus());

        return MonitorRespDTO.builder()
                .id(task.getId())
                .status(task.getStatus())
                .build();
    }

    @Override
    public List<RunningTasksDTO> getMonitoringQueue() {
        List<MonitoringTask> runningTasks = monitorService.findActiveMonitoringTasks();
        return runningTasks.stream().map(monitorTaskMapper::toDTO).toList();
    }

    @Override
    public List<ExecHistoryDTO> getMonitoringHistory() {
        return monitoringTaskHistoryService.findAllMonitoringTaskHistory().stream()
                .map(monitorHistoryMapper::toDTO).toList();
    }
}

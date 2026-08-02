package com.shubham225.jobmonitor.service.impl;

import com.shubham225.jobmonitor.exception.JobTaskMappingNotFoundException;
import com.shubham225.jobmonitor.model.entity.WinSchedTask;
import com.shubham225.jobmonitor.model.enums.TaskSchedulerStatus;
import com.shubham225.jobmonitor.model.mapper.ScheduledTaskMapper;
import com.shubham225.jobmonitor.repository.WinSchedTaskRepository;
import com.shubham225.jobmonitor.service.WinSchedTaskService;
import com.shubham225.jobmonitor.service.WinTaskToJobMappingService;
import com.shubham225.jobmonitor.windows.scheduler.TaskSchedulerClient;
import com.shubham225.jobmonitor.windows.scheduler.domain.ScheduledTask;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class WinSchedTaskServiceImpl implements WinSchedTaskService {
    private final WinTaskToJobMappingService winTaskToJobMappingService;
    private final WinSchedTaskRepository winSchedTaskRepository;
    private final TaskSchedulerClient taskSchedulerClient;
    private final ScheduledTaskMapper scheduledTaskMapper;

    @Override
    public WinSchedTask getWinSchedTaskForJob(String hostName, String jobCode, String company) {
        // Fetch TaskName of the WinSchedTask
        String taskName = "";

        // ------------------------------------------
        // TODO: Implementation for Linux cron jobs - for now using dummy task
        String os = System.getProperty("os.name").toLowerCase();

        if (os.contains("linux")) {
            WinSchedTask winSchedTaskDummy = new WinSchedTask();
            winSchedTaskDummy.setTaskName(jobCode);
            winSchedTaskDummy.setHostName(hostName);
            winSchedTaskDummy.setStatus(TaskSchedulerStatus.RUNNING);
            winSchedTaskDummy.setLastRuntime(LocalDateTime.now());
            return winSchedTaskDummy;
        }
        // ------------------------------------------

        try {
            taskName = winTaskToJobMappingService.findWinTaskOfJob(jobCode, company);
        } catch (JobTaskMappingNotFoundException e) {
            log.error("Exception occurred while trying to find winTaskToJobMapping for job {}",  jobCode);
            if (winTaskToJobMappingService.isLastGeneratedMappingOlderThanOneDay()) {
                winTaskToJobMappingService.generateWinTaskToJobMapping();
                try {
                    taskName = winTaskToJobMappingService.findWinTaskOfJob(jobCode, company);
                } catch (JobTaskMappingNotFoundException ex) {
                    throw new IllegalStateException(
                            "Failed to resolve WinTask mapping even after regeneration", ex
                    );
                }
            } else {
                throw new IllegalStateException("Failed to resolve WinTask mapping, last generated mapping is not older than 1 day");
            }
        }

        // Create WinSchedTask object from TaskName.
        WinSchedTask winSchedTask = new WinSchedTask();

        try {
            ScheduledTask task = taskSchedulerClient.fetchWinSchedTaskDetails(hostName, taskName, "");
            winSchedTask = scheduledTaskMapper.toWinSchedTask(task);
        } catch (Exception e) {
            log.error("Exception occurred while trying to fetch Windows Scheduler Task", e);
            winSchedTask.setStatus(TaskSchedulerStatus.UNKNOWN);
        }

        winSchedTask.setTaskName(taskName);
        winSchedTask.setHostName(hostName);

        return winSchedTask;
    }
}

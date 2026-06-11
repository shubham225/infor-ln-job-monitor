package com.shubham225.service.impl;

import com.shubham225.exception.JobTaskMappingNotFoundException;
import com.shubham225.model.entity.WinSchedTask;
import com.shubham225.model.enums.TaskSchedulerStatus;
import com.shubham225.model.mapper.ScheduledTaskMapper;
import com.shubham225.repository.WinSchedTaskRepository;
import com.shubham225.service.WinSchedTaskService;
import com.shubham225.service.WinTaskToJobMappingService;
import com.shubham225.windows.scheduler.TaskSchedulerClient;
import com.shubham225.windows.scheduler.domain.ScheduledTask;
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

        // TODO: Remove or update logic after testing on Linux
        // ------------------------------------------
//        String os = System.getProperty("os.name").toLowerCase();
//        if (os.contains("linux")) {
//            WinSchedTask winSchedTaskDummy = new WinSchedTask();
//            winSchedTaskDummy.setTaskName(jobCode);
//            winSchedTaskDummy.setHostName(hostName);
//            winSchedTaskDummy.setStatus(TaskSchedulerStatus.RUNNING);
//            winSchedTaskDummy.setLastRuntime(LocalDateTime.now());
//            return winSchedTaskDummy;
//        }
        // ------------------------------------------

        try {
            taskName = winTaskToJobMappingService.findWinTaskOfJob(jobCode, company);
        } catch (JobTaskMappingNotFoundException e) {
            winTaskToJobMappingService.generateWinTaskToJobMapping();
            try {
                taskName = winTaskToJobMappingService.findWinTaskOfJob(jobCode, company);
            } catch (JobTaskMappingNotFoundException ex) {
                throw new IllegalStateException(
                        "Failed to resolve WinTask mapping even after regeneration", ex
                );
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

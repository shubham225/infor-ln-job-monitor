package com.shubham225.service.impl;

import com.shubham225.exception.JobTaskMappingNotFoundException;
import com.shubham225.model.entity.InforERPJob;
import com.shubham225.model.entity.WinSchedTask;
import com.shubham225.model.key.WinSchedTaskId;
import com.shubham225.model.mapper.ScheduledTaskMapper;
import com.shubham225.repository.WinSchedTaskRepository;
import com.shubham225.service.WinSchedTaskService;
import com.shubham225.service.WinTaskToJobMappingService;
import com.shubham225.windows.scheduler.TaskSchedulerClient;
import com.shubham225.windows.scheduler.domain.ScheduledTask;
import com.shubham225.windows.scheduler.domain.TaskQuery;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class WinSchedTaskServiceImpl implements WinSchedTaskService {
    private final WinTaskToJobMappingService winTaskToJobMappingService;
    private final WinSchedTaskRepository winSchedTaskRepository;
    private final TaskSchedulerClient taskSchedulerClient;
    private final ScheduledTaskMapper scheduledTaskMapper;

    @Override
    public WinSchedTask findOrCreateWinSchedTask(InforERPJob job) {
        // TODO: Just in case, modify later
        if (job.getWinTask() != null) {
            return job.getWinTask();
        }

        String taskName = "";

        try {
            taskName = winTaskToJobMappingService.findWinTaskOfJob(job.getId().getJobName(), job.getId().getCompany());
        } catch (JobTaskMappingNotFoundException e) {
            winTaskToJobMappingService.generateWinTaskToJobMapping();
            try {
                taskName = winTaskToJobMappingService.findWinTaskOfJob(job.getId().getJobName(), job.getId().getCompany());
            } catch (JobTaskMappingNotFoundException ex) {
                throw new IllegalStateException(
                        "Failed to resolve WinTask mapping even after regeneration", ex
                );
            }
        }

        return refershWinSchedTask(new WinSchedTaskId(taskName, job.getId().getServer()));
    }

    @Override
    public WinSchedTask refershWinSchedTask(WinSchedTaskId task) {
        TaskQuery query = new TaskQuery(task.getTaskName(), "");
        ScheduledTask taskDto = taskSchedulerClient.findWinSchedTask(query);
        WinSchedTask winSchedTask = scheduledTaskMapper.toWinSchedTask(taskDto);
        return saveWinSchedTask(winSchedTask);
    }

    private WinSchedTask saveWinSchedTask(WinSchedTask task) {
        return winSchedTaskRepository.save(task);
    }
}

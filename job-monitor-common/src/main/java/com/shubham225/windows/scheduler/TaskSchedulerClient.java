package com.shubham225.windows.scheduler;

import com.shubham225.windows.scheduler.domain.ScheduledTask;
import com.shubham225.windows.scheduler.domain.TaskQuery;

import java.util.List;

public interface TaskSchedulerClient {
    ScheduledTask findWinSchedTask(TaskQuery taskQuery);
    List<ScheduledTask> findAllWinSchedTask(TaskQuery taskQuery);
    ScheduledTask fetchWinSchedTaskDetails(String hostName, String taskName, String folder);
}

package com.shubham225.windows.scheduler;

import com.shubham225.windows.scheduler.domain.ScheduledTask;
import com.shubham225.windows.scheduler.domain.TaskQuery;

import java.util.List;

public interface TaskSchedulerClient {
    public ScheduledTask findWinSchedTask(TaskQuery taskQuery);
    public List<ScheduledTask> findAllWinSchedTask(TaskQuery taskQuery);
}

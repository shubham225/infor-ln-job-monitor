package com.shubham225.jobmonitor.model.mapper;

import com.shubham225.jobmonitor.model.entity.WinSchedTask;
import com.shubham225.jobmonitor.windows.scheduler.domain.ScheduledTask;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ScheduledTaskMapper {
    WinSchedTask toWinSchedTask(ScheduledTask task);
}

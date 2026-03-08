package com.shubham225.model.mapper;

import com.shubham225.model.entity.WinSchedTask;
import com.shubham225.windows.scheduler.domain.ScheduledTask;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ScheduledTaskMapper {
    @Mappings({
            @Mapping(target = "id.taskName", source = "taskName"),
            @Mapping(target = "id.server", source = "server"),
    })
    public WinSchedTask toWinSchedTask(ScheduledTask task);
}

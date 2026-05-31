package com.shubham225.model.mapper;

import com.shubham225.model.dto.RunningTaskDTO;
import com.shubham225.model.entity.MonitoringTask;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface MonitorTaskMapper {
    @Mappings({
            @Mapping(target = "jobName", source = "job.jobCode"),
            @Mapping(target = "company", source = "job.company"),
            @Mapping(target = "server", source = "job.hostName"),
            @Mapping(target = "jobStatus", source = "job.status"),
            @Mapping(target = "jobUser", source = "job.jobUser"),
            @Mapping(target = "jobStartedAt", source = "job.jobStartedAt"),
    })
    RunningTaskDTO toDTO(MonitoringTask task);
}

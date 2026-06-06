package com.shubham225.model.mapper;

import com.shubham225.model.dto.ExecutionHistoryDTO;
import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.model.entity.MonitoringTaskHistory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface MonitorHistoryMapper {
    ExecutionHistoryDTO toDTO(MonitoringTaskHistory history);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "version", ignore = true),
            @Mapping(target = "jobCode", source = "job.jobCode"),
            @Mapping(target = "jobUser", source = "job.userId"),
            @Mapping(target = "company", source = "job.company"),
            @Mapping(target = "hostName", source = "job.hostName"),
            @Mapping(target = "hostDisplayName", source = "job.hostDisplayName"),
            @Mapping(target = "jobStatus", source = "job.status"),
            @Mapping(target = "jobStartedAt", source = "job.jobStartedAt"),
            @Mapping(target = "jobEndedAt", source = "job.jobEndedAt"),
            @Mapping(target = "taskName", source = "job.winTask.taskName"),
            @Mapping(target = "taskStatus", source = "job.winTask.status"),
            @Mapping(target = "cause", source = "reason"),
            @Mapping(target = "isMailSent", source = "mailSent")
    })
    MonitoringTaskHistory toHistory(MonitoringTask task);
}

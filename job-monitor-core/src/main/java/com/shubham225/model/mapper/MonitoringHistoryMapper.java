package com.shubham225.model.mapper;

import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.model.entity.MonitoringTaskHistory;
import org.springframework.stereotype.Component;

@Component
public class MonitoringHistoryMapper {
    public MonitoringTaskHistory toHistory(MonitoringTask task) {
        return MonitoringTaskHistory.builder()
                .jobName(task.getJob().getId().getJobName())
                .jobUser(task.getJob().getJobUser())
                .company(task.getJob().getId().getCompany())
                .server(task.getJob().getId().getServer())
                .serverName("TODO")
                .jobStatus(task.getJob().getStatus())
                .jobStartedAt(task.getJob().getJobStartedAt())
                .jobEndedAt(task.getJob().getJobEndedAt())
                .taskName(task.getJob().getWinTask().getId().getTaskName())
                .taskStatus(task.getJob().getWinTask().getStatus())
                .cause(task.getReason())
                .executedOn(task.getExecutedOn())
                .terminatedOn(task.getTerminatedOn())
                .isMailSent(task.isMailSent())
                .build();
    }
}

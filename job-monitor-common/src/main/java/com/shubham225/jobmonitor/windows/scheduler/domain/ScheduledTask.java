package com.shubham225.jobmonitor.windows.scheduler.domain;

import com.shubham225.jobmonitor.model.enums.TaskSchedulerStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ScheduledTask {
    private String taskName;
    private String hostName;

    private String action;
    private TaskSchedulerStatus status;
    private LocalDateTime lastRuntime;
    private LocalDateTime nextRuntime;
}

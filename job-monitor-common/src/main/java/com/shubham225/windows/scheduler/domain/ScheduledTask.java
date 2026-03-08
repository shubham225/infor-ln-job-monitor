package com.shubham225.windows.scheduler.domain;

import com.shubham225.model.enums.TaskSchedulerStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ScheduledTask {
    private String taskName;
    private String server;
    private TaskSchedulerStatus status;
    private String action;
    private LocalDateTime lastRuntime;
    private LocalDateTime nextRuntime;
}

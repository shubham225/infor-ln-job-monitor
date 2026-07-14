package com.shubham225.jobmonitor.model.dto;

import com.shubham225.jobmonitor.model.enums.ERPJobStatus;
import com.shubham225.jobmonitor.model.enums.FailureReason;
import com.shubham225.jobmonitor.model.enums.TaskSchedulerStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class ExecutionHistoryDTO {
    private String jobName;
    private String jobUser;
    private String company;
    private String server;
    private String serverName;
    private ERPJobStatus jobStatus;
    private LocalDateTime jobStartedAt;
    private LocalDateTime jobEndedAt;
    private String taskName;
    private TaskSchedulerStatus taskStatus;
    private FailureReason cause;
    private LocalDateTime executedOn;
    private LocalDateTime terminatedOn;
    private Boolean isMailSent;
}

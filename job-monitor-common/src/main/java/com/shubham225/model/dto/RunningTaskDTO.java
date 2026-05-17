package com.shubham225.model.dto;

import com.shubham225.model.enums.ERPJobStatus;
import com.shubham225.model.enums.MonitoringStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class RunningTaskDTO {
    private String taskName;
    private String jobName;
    private String company;
    private String server;
    private ERPJobStatus jobStatus;
    private String jobUser;
    private LocalDateTime jobStartedAt;
    private MonitoringStatus status;
    private LocalDateTime executedOn;
}

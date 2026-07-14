package com.shubham225.jobmonitor.model.entity;

import com.shubham225.jobmonitor.model.enums.ERPJobStatus;
import com.shubham225.jobmonitor.model.enums.FailureReason;
import com.shubham225.jobmonitor.model.enums.TaskSchedulerStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MonitoringTaskHistory extends BaseEntity{
    private String jobCode;
    private String jobUser;
    private String company;
    private String hostName;
    private String hostDisplayName;
    private ERPJobStatus jobStatus;
    private LocalDateTime jobStartedAt;
    private LocalDateTime jobEndedAt;
    private String taskName;
    private TaskSchedulerStatus taskStatus;
    private FailureReason cause;
    private LocalDateTime executedOn;
    private LocalDateTime terminatedOn;
    @Column(nullable = false)
    private Boolean isMailSent = false;
}

package com.shubham225.model.entity;

import com.shubham225.model.enums.ERPJobHistoryStatus;
import com.shubham225.model.enums.ERPJobStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        uniqueConstraints = @UniqueConstraint(
            columnNames = {"jobCode", "company", "hostName"}
        )
)
public class InforERPJob extends BaseEntity {
    private String jobCode;
    private String company;
    private String hostName;

    private String description;
    private String hostDisplayName;
    private ERPJobStatus status;
    private ERPJobHistoryStatus historyStatus;
    private String userId;
    private LocalDateTime jobStartedAt;
    private LocalDateTime jobEndedAt;
    private LocalDateTime nextJobExecutionAt;
    private Integer jobAverageRuntimeInSec = 0;

    @OneToOne(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private WinSchedTask winTask;

    public Boolean isRunning() {
        return status == ERPJobStatus.RUNNING && historyStatus == ERPJobHistoryStatus.UNKNOWN;
    }

    public Boolean isCompleted() {
        return status == ERPJobStatus.CANCELED || status == ERPJobStatus.BLOCKED ||
               status == ERPJobStatus.FREE || status == ERPJobStatus.RUNTIME_ERROR;
    }
}

package com.shubham225.model.entity;

import com.shubham225.model.enums.ERPJobHistoryStatus;
import com.shubham225.model.key.ERPJobId;
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
public class InforERPJob extends AuditableEntity {
    @EmbeddedId
    private ERPJobId id;
    @Version
    private Long version;
    private String jobDescription;
    private ERPJobStatus status;
    private ERPJobHistoryStatus historyStatus;
    private String jobUser;
    private LocalDateTime jobStartedAt;
    private LocalDateTime jobEndedAt;
    private LocalDateTime nextJobExecutionAt;
    private Integer jobAverageRuntimeInSec = 0;
    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumns({
            @JoinColumn(name = "win_task_name", referencedColumnName = "taskName"),
            @JoinColumn(name = "win_task_server", referencedColumnName = "server")
    })
    private WinSchedTask winTask;

    public Boolean isRunning() {
        return status == ERPJobStatus.RUNNING && historyStatus == ERPJobHistoryStatus.UNKNOWN;
    }

    public Boolean isCompleted() {
        return status == ERPJobStatus.CANCELED || status == ERPJobStatus.BLOCKED ||
               status == ERPJobStatus.FREE || status == ERPJobStatus.RUNTIME_ERROR;
    }

    @Override
    public String toString() {
        return id.getJobName() + "_" + id.getCompany();
    }
}

package com.shubham225.model.entity;

import com.shubham225.model.enums.FailureReason;
import com.shubham225.model.enums.MonitoringStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MonitoringTask extends BaseEntity {
    private String taskName;
    private MonitoringStatus status;

    @OneToOne(
            cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE },
            orphanRemoval = true
    )
    private InforERPJob job;

    private FailureReason reason;
    private LocalDateTime executedOn;
    private LocalDateTime terminatedOn;
    @Column(nullable = false)
    private boolean isMailSent = false;
    private LocalDateTime nextPoolingAt;

    public Boolean isReadyToPoll() {
        return !nextPoolingAt.isAfter(LocalDateTime.now());
    }

    public Boolean isRunning() {
        return status == MonitoringStatus.RUNNING;
    }

    public Boolean isPending() {
        return status == MonitoringStatus.PENDING;
    }

    public Boolean isCompleted() {
        return status == MonitoringStatus.FAILED || status == MonitoringStatus.COMPLETED;
    }

    public void setStatus(MonitoringStatus status) {
        this.status = status;
        this.terminatedOn = LocalDateTime.now();
    }

    public String toString() {
        return String.format("%s@%s[%s]", taskName, job.getHostName(), job.getCompany());
    }
}

package com.shubham225.model.entity;

import com.shubham225.model.enums.TaskSchedulerStatus;
import com.shubham225.model.key.WinSchedTaskId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WinSchedTask extends CommonFields{
    @EmbeddedId
    private WinSchedTaskId id;
    @Version
    private Long version;
    private TaskSchedulerStatus status;
    private LocalDateTime lastRuntime;
    private LocalDateTime nextRuntime;
    private Integer numberOfMissedRuns;
}

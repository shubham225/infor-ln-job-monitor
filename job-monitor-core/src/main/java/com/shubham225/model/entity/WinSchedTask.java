package com.shubham225.model.entity;

import com.shubham225.model.enums.TaskSchedulerStatus;
import com.shubham225.model.key.WinSchedTaskId;
import jakarta.persistence.*;
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
public class WinSchedTask extends BaseEntity{
    private String taskName;
    private String hostName;

    private TaskSchedulerStatus status;
    private LocalDateTime lastRuntime;
    private LocalDateTime nextRuntime;
    private Integer numberOfMissedRuns;
}

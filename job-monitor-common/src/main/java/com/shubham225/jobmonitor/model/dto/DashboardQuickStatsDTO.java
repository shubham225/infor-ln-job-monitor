package com.shubham225.jobmonitor.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class DashboardQuickStatsDTO {
    private Long averageExecutionTimeMs;
    private Long activeJobs;
    private LocalDateTime lastAlertTime;
    private Long uptimeMs;
    private Long scheduledTasks;
}

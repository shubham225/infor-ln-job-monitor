package com.shubham225.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DashboardSummeryDTO {
    private Long totalJobExecutions;
    private Long totalFailedJobs;
    private Long totalSuccessfulJobs;
    private Long totalRunningJobs;
}

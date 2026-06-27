package com.shubham225.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DashboardStatsDTO {
    private DashboardSummeryDTO summery;
    private FailedJobsByReasonDTO[] failedJobsByReason;
    private DashboardQuickStatsDTO quickStats;
}

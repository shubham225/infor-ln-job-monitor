package com.shubham225.service.impl;

import com.shubham225.model.dto.*;
import com.shubham225.model.enums.FailureReason;
import com.shubham225.service.DashboardService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DashboardServiceImpl implements DashboardService {
    @Override
    public DashboardStatsDTO getDashboardStats() {
        DashboardSummeryDTO dashboardSummery =
                                DashboardSummeryDTO.builder()
                                        .totalJobExecutions(10300L)
                                        .totalFailedJobs(5000L)
                                        .totalRunningJobs(5L)
                                        .totalSuccessfulJobs(5300L)
                                        .build();

        DashboardQuickStatsDTO quickStats =
                                DashboardQuickStatsDTO.builder()
                                        .activeJobs(5L)
                                        .averageExecutionTimeMs(14000L)
                                        .lastAlertTime(LocalDateTime.now().minusMinutes(2).minusSeconds(32))
                                        .uptimeMs(14000000L)
                                        .scheduledTasks(45L)
                                        .build();

        FailedJobsByReasonDTO[] failedJobsByReason = {
                new FailedJobsByReasonDTO(FailureReason.PENDING, 8L),
                new FailedJobsByReasonDTO(FailureReason.JOB_DETAILS_MISSING, 2L),
                new FailedJobsByReasonDTO(FailureReason.NOT_FOUND, 1L),
                new FailedJobsByReasonDTO(FailureReason.NOT_EXECUTED, 4L),
                new FailedJobsByReasonDTO(FailureReason.RUNTIME_ERROR, 6L),
                new FailedJobsByReasonDTO(FailureReason.EXECUTED_WITH_RUNTIME_ERROR, 3L),
                new FailedJobsByReasonDTO(FailureReason.TIME_LIMIT_EXCEEDED, 5L),
                new FailedJobsByReasonDTO(FailureReason.CANCELED, 1L),
                new FailedJobsByReasonDTO(FailureReason.ERP_API_DOWN, 2L),
                new FailedJobsByReasonDTO(FailureReason.EXECUTED, 42L),
                new FailedJobsByReasonDTO(FailureReason.WIN_SCHEDULER_RUNNING, 3L),
                new FailedJobsByReasonDTO(FailureReason.EXEC_WITH_ERROR_MESSAGE, 2L)
        };

        return DashboardStatsDTO.builder()
                .quickStats(quickStats)
                .summery(dashboardSummery)
                .failedJobsByReason(failedJobsByReason)
                .build();
    }

    @Override
    public MonthlyExecutionTrendDTO[] getMonthlyExecutionTrend() {
        return new MonthlyExecutionTrendDTO[]{
                new MonthlyExecutionTrendDTO("January", 186L, 80L),
                new MonthlyExecutionTrendDTO("February", 305L, 200L),
                new MonthlyExecutionTrendDTO("March", 237L, 120L),
                new MonthlyExecutionTrendDTO("April", 73L, 190L),
                new MonthlyExecutionTrendDTO("May", 209L, 130L),
                new MonthlyExecutionTrendDTO("June", 214L, 140L)
        };
    }
}

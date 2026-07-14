package com.shubham225.jobmonitor.service.impl;

import com.shubham225.jobmonitor.model.dto.*;
import com.shubham225.jobmonitor.model.entity.MonitoringTaskHistory;
import com.shubham225.jobmonitor.model.enums.FailureReason;
import com.shubham225.jobmonitor.repository.MonitoringTaskHistoryRepository;
import com.shubham225.jobmonitor.repository.MonitoringTaskRepository;
import com.shubham225.jobmonitor.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.format.TextStyle;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final MonitoringTaskHistoryRepository monitoringTaskHistoryRepository;
    private final MonitoringTaskRepository monitoringTaskRepository;
    private final ApplicationUptime applicationUptime;

    @Override
    public DashboardStatsDTO getDashboardStats() {
        // Summery
        long totalTaskExecutions = monitoringTaskHistoryRepository.count();
        long totalSuccessfulExecutions = monitoringTaskHistoryRepository.countByCause(FailureReason.EXECUTED);
        long totalFailedExecutions = totalTaskExecutions -  totalSuccessfulExecutions;
        long totalRunningExecutions = monitoringTaskRepository.count();

        DashboardSummeryDTO dashboardSummery =
                                DashboardSummeryDTO.builder()
                                        .totalJobExecutions(totalTaskExecutions)
                                        .totalFailedJobs(totalFailedExecutions)
                                        .totalRunningJobs(totalRunningExecutions)
                                        .totalSuccessfulJobs(totalSuccessfulExecutions)
                                        .build();

        // Quick Stats
        MonitoringTaskHistory latest = monitoringTaskHistoryRepository.findTopByOrderByTerminatedOnDesc().orElse(null);
        LocalDateTime lastAlertTime = (latest != null) ? latest.getTerminatedOn() : LocalDateTime.MIN;
        List<MonitoringTaskHistory> latestTasks = monitoringTaskHistoryRepository.findTop100ByOrderByExecutedOnDesc();
        long averageExecutionTimeMs = (long) latestTasks.stream()
                    .filter(task -> task.getJobStartedAt() != null && task.getJobEndedAt() != null)
                    .mapToLong(task ->
                            Duration.between(task.getJobStartedAt(), task.getJobEndedAt()).toMillis())
                    .average()
                    .orElse(0);

        DashboardQuickStatsDTO quickStats =
                                DashboardQuickStatsDTO.builder()
                                        .activeJobs(totalRunningExecutions)
                                        .averageExecutionTimeMs(averageExecutionTimeMs)
                                        .lastAlertTime(lastAlertTime)
                                        .uptimeMs(applicationUptime.getUptimeMs())
                                        .scheduledTasks(45L)
                                        .build();

        // Failed Jobs by Reason
        Map<FailureReason, Long> counts = Arrays.stream(FailureReason.values())
                .collect(Collectors.toMap(
                        Function.identity(),
                        reason -> 0L
                ));

        monitoringTaskHistoryRepository.countByFailureReason().forEach(record -> {
            FailureReason reason = (FailureReason) record[0];
            Long count = (Long) record[1];
            counts.put(reason, count);
        });

        FailedJobsByReasonDTO[] failedJobsByReason = counts.entrySet()
                .stream()
                .map(entry -> new FailedJobsByReasonDTO(entry.getKey(), entry.getValue()))
                .toArray(FailedJobsByReasonDTO[]::new);;

        return DashboardStatsDTO.builder()
                .quickStats(quickStats)
                .summery(dashboardSummery)
                .failedJobsByReason(failedJobsByReason)
                .build();
    }

    // TODO: Modify logic for large dataset this will have performance issues
    @Override
    public MonthlyExecutionTrendDTO[] getMonthlyExecutionTrend() {
        LocalDateTime start = LocalDate.now()
                .withDayOfYear(1)
                .atStartOfDay();

        LocalDateTime end = LocalDateTime.now();

        List<MonitoringTaskHistory> histories =
                monitoringTaskHistoryRepository.findByExecutedOnBetween(start, end);

        Map<Month, MonthlyExecutionTrendDTO> trend = Arrays.stream(Month.values())
                .collect(Collectors.toMap(
                        Function.identity(),
                        month -> new MonthlyExecutionTrendDTO(
                                month.getDisplayName(TextStyle.FULL, Locale.ENGLISH),
                                0L,
                                0L
                        ),
                        (a, b) -> a,
                        LinkedHashMap::new
                ));

        for (MonitoringTaskHistory history : histories) {
            Month month = history.getExecutedOn().getMonth();
            MonthlyExecutionTrendDTO dto = trend.get(month);

            if (history.getCause() == FailureReason.EXECUTED) {
                dto.setSuccessfulExecutions(dto.getSuccessfulExecutions() + 1);
            } else {
                dto.setFailedExecutions(dto.getFailedExecutions() + 1);
            }
        }

        return trend.values().toArray(MonthlyExecutionTrendDTO[]::new);
    }
}

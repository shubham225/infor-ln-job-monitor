package com.shubham225.service.impl;

import com.shubham225.model.entity.InforERPJob;
import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.model.entity.MonitoringTaskHistory;
import com.shubham225.model.enums.FailureReason;
import com.shubham225.model.enums.MonitoringStatus;
import com.shubham225.model.mapper.MonitorHistoryMapper;
import com.shubham225.repository.MonitoringTaskRepository;
import com.shubham225.service.JobService;
import com.shubham225.service.JobValidationService;
import com.shubham225.service.MonitoringTaskHistoryService;
import com.shubham225.service.MonitoringTaskService;
import com.shubham225.service.jobfailure.JobFailureStrategy;
import com.shubham225.service.jobfailure.JobFailureStrategyFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MonitoringTaskServiceImpl implements MonitoringTaskService {
    private final JobService jobService;
    private final JobValidationService jobValidationService;
    private final JobFailureStrategyFactory jobFailureStrategyFactory;
    private final MonitoringTaskRepository monitoringTaskRepository;
    private final MonitorHistoryMapper monitorHistoryMapper;
    private final MonitoringTaskHistoryService monitoringTaskHistoryService;

    @Override
    public MonitoringTask createMonitorTask(InforERPJob job) {
        MonitoringTask task = MonitoringTask.builder()
                .taskName(job.getWinTask().getTaskName())
                .job(job)
                .status(MonitoringStatus.PENDING)
                .reason(FailureReason.PENDING)
                .executedOn(LocalDateTime.now())
                .terminatedOn(null)
                .isMailSent(false)
                .nextPoolingAt(LocalDateTime.now())
                .build();

        return saveMonitorTask(task);
    }

    @Override
    public List<MonitoringTask> findActiveMonitoringTasks() {
        return monitoringTaskRepository.findAllByStatusIn(
                List.of(MonitoringStatus.PENDING, MonitoringStatus.RUNNING)
        );
    }

    @Override
    public void archiveMonitoringTask(MonitoringTask task) {
        log.info("Archiving the monitor task {}", task);
        MonitoringTaskHistory history = monitorHistoryMapper.toHistory(task);
        history = monitoringTaskHistoryService.saveMonitoringTaskHistory(history);
        // CascadeType.REMOVE is set for related tables, it will delete all the related table records.
        monitoringTaskRepository.delete(task);
    }

    @Override
    public MonitoringTask saveMonitorTask(MonitoringTask monitoringTask) {
        return monitoringTaskRepository.save(monitoringTask);
    }

    @Override
    public void validateAndNotifyTaskExecution(MonitoringTask monitoringTask) {
        if (monitoringTask.isPending()) {
            if (jobValidationService.jobDetailsAreValid(monitoringTask)) {
                monitoringTask.setStatus(MonitoringStatus.RUNNING);
            } else {
                log.error("Details received from job-monitor-cli are not valid / missing.");
                monitoringTask.setReason(FailureReason.JOB_DETAILS_MISSING);
                monitoringTask.setStatus(MonitoringStatus.COMPLETED);
            }
        }

        if (monitoringTask.isRunning()) {
            // Send Request to ERP to fetch job details
            jobService.refreshERPJobDetails(monitoringTask);

            // Calculate lapsedTime to determine if job is started in ERP
            long lapsedTimeInSeconds = Duration.between(monitoringTask.getExecutedOn(), LocalDateTime.now()).getSeconds();
            long maxWaitTimeInSeconds = 30;

            // If API is down then monitoring task will not be running
            if (monitoringTask.isRunning()) {
                if (lapsedTimeInSeconds < maxWaitTimeInSeconds) {
                    log.info("Waiting for job to start in ERP, waited for {} seconds", lapsedTimeInSeconds);

                    if (monitoringTask.getJob().isRunning()) {
                        log.info("Job started in ERP, waited for {} seconds", lapsedTimeInSeconds);
                    } else {
                        return;
                    }
                } else {
                    if (!monitoringTask.getJob().isRunning()) {
                        log.info("Waited for job to start in ERP for {} seconds, but job is not started", maxWaitTimeInSeconds);
                        monitoringTask.setReason(FailureReason.NOT_EXECUTED);
                        monitoringTask.setStatus(MonitoringStatus.COMPLETED);
                    }
                }
            }

            if (monitoringTask.getJob().isRunning() && !monitoringTask.isCompleted()) {
                // TODO: add this delay in frontend settings
                long bufferTimeInSeconds = 100;
                long averageJobRuntimeInSeconds = monitoringTask.getJob().getJobAverageRuntimeInSec() + bufferTimeInSeconds;

                if (lapsedTimeInSeconds > averageJobRuntimeInSeconds) {
                    log.warn("Job {} usually takes {} seconds to complete but its been running for {} seconds.",
                            monitoringTask.getJob(), averageJobRuntimeInSeconds, lapsedTimeInSeconds);
                    monitoringTask.setReason(FailureReason.TIME_LIMIT_EXCEEDED);
                    monitoringTask.setStatus(MonitoringStatus.COMPLETED);
                }

                // Calculate next pooling time, logic: based on runtime calculate mid-time in between current and expected
                monitoringTask.setNextPoolingAt(
                        calculateNextPollingAt(
                                monitoringTask.getJob().getJobStartedAt(),
                                averageJobRuntimeInSeconds)
                );
            } else {
                /* NOTE:
                    This section defines job has finished / is not running in ERP anymore, this check if
                    job completed correctly and update Monitoring Task status accordingly.
                 */

                // If job is not executed in ERP then no need to validate job execution
                if (!monitoringTask.getReason().equals(FailureReason.NOT_EXECUTED)) {
                    jobValidationService.validateJobExecutionInERP(monitoringTask);
                }
            }
        }

        if (monitoringTask.isCompleted()) {
            try {
                JobFailureStrategy failureStrategy = jobFailureStrategyFactory
                        .getJobFailureStrategy(monitoringTask.getReason());
                failureStrategy.handleFailureOrSuccess(monitoringTask);
            } catch (RuntimeException e) {
                log.error("Error: {}, while resolving jobFailure strategy for reason {}",
                        e.getMessage(), monitoringTask.getReason().toString());
            }

        }

        // Archive monitoring task to history and delete related records once monitoring task is completed, else
        // save the monitor task and related tables
        if (monitoringTask.isCompleted()) {
            archiveMonitoringTask(monitoringTask);
        } else {
            saveMonitorTask(monitoringTask);
        }
    }

    private LocalDateTime calculateNextPollingAt(LocalDateTime jobStartedAt, long jobAverageRuntimeInSec) {
        LocalDateTime expectedJobEndDateTime = jobStartedAt.plusSeconds(jobAverageRuntimeInSec);
        LocalDateTime currentDateTime = LocalDateTime.now();

        if (currentDateTime.isBefore(expectedJobEndDateTime)) {
            Duration duration = Duration.between(currentDateTime, expectedJobEndDateTime);
            // Return the midpoint of current datetime and expected job end date time
            return currentDateTime.plusSeconds(duration.getSeconds() / 2);
        }

        return LocalDateTime.now();
    }
}

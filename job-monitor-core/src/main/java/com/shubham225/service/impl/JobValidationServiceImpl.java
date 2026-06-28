package com.shubham225.service.impl;

import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.model.enums.FailureReason;
import com.shubham225.model.enums.MonitoringStatus;
import com.shubham225.repository.MonitoringTaskRepository;
import com.shubham225.service.ExclusionService;
import com.shubham225.service.JobValidationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobValidationServiceImpl implements JobValidationService {
    private final ExclusionService exclusionService;

    @Override
    public void validateJobExecutionInERP(MonitoringTask monitoringTask) {
        // This function will run after job execution has been completed in the ERP
        if (monitoringTask.getJob().isCompleted()) {
            monitoringTask.setStatus(MonitoringStatus.COMPLETED);
            monitoringTask.setReason(evaluateFailureReason(monitoringTask));

            log.info("Job {} is completed in ERP, reason {}",
                    monitoringTask.getJob(), monitoringTask.getReason().toString());
        } else {
            log.error("Unknown Scenario: Job {} is not completed in ERP, but have status {}",
                    monitoringTask.getJob(), monitoringTask.getJob().getStatus());
        }
    }

    @Override
    public boolean jobDetailsAreValid(MonitoringTask monitoringTask) {
        // If job and company details are present then return true else false
        return !monitoringTask.getJob().getJobCode().isBlank() &&
                !monitoringTask.getJob().getCompany().isBlank();
    }

    private FailureReason evaluateFailureReason(MonitoringTask monitoringTask) {
        // Evaluate failure reason based on job history status and job status
        FailureReason reason = FailureReason.PENDING;

        if (exclusionService.isJobStatusExcludedFromMonitoringAlert(
                                                monitoringTask.getJob().getHostName(),
                                                monitoringTask.getJob().getStatus())) {
            log.warn("Job {} is excluded from monitoring alert due to job status exclusion {}",
                                monitoringTask.getJob(), monitoringTask.getJob().getStatus());
            reason = FailureReason.SKIPPED;
            return reason;
        }

        reason = switch (monitoringTask.getJob().getStatus()) {
            case CANCELED, BLOCKED -> FailureReason.NOT_EXECUTED;
            default -> reason;
        };

        if (reason == FailureReason.NOT_EXECUTED) {
            return reason;
        }

        reason = switch (monitoringTask.getJob().getHistoryStatus()) {
            case CANCELED -> FailureReason.CANCELED;
            case EXECUTED -> FailureReason.EXECUTED;
            case OUT_OF_TIME -> FailureReason.TIME_LIMIT_EXCEEDED;
            case RUNTIME_ERROR -> FailureReason.RUNTIME_ERROR;
            case EXEC_WITH_RUNTIME_ERROR -> FailureReason.EXECUTED_WITH_RUNTIME_ERROR;
            default -> FailureReason.NOT_FOUND;
        };

        return reason;
    }
}

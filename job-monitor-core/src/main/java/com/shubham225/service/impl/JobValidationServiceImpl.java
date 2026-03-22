package com.shubham225.service.impl;

import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.model.enums.FailureReason;
import com.shubham225.model.enums.MonitoringStatus;
import com.shubham225.service.JobValidationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class JobValidationServiceImpl implements JobValidationService {
    @Override
    public void validateJobExecutionInERP(MonitoringTask monitoringTask) {
        // NOTE: This function will run after job execution has been completed in the ERP
        // TODO: If started in ERP then proceed with verification of status and update reason in monitor task
        if (monitoringTask.getJob().isCompleted()) {
            monitoringTask.setStatus(MonitoringStatus.COMPLETED);
            monitoringTask.setReason(evaluateFailureReason(monitoringTask));

            log.info("Job {} is completed in ERP, reason {}",
                    monitoringTask.getJob(), monitoringTask.getReason().toString());
        } else {

            log.error("Unknown Scenario: Job {} is not running in ERP, but have status {}",
                    monitoringTask.getJob(), monitoringTask.getJob().getStatus());
        }
    }

    @Override
    public boolean jobDetailsAreValid(MonitoringTask monitoringTask) {
        // If job and company details are present then return true else false
        return !monitoringTask.getJob().getId().getJobName().isBlank() &&
                !monitoringTask.getJob().getId().getCompany().isBlank();
    }

    private FailureReason evaluateFailureReason(MonitoringTask monitoringTask) {
        // TODO: mail logic to update failure reason
        FailureReason reason = FailureReason.PENDING;

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

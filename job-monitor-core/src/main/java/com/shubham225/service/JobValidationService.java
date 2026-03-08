package com.shubham225.service;

import com.shubham225.model.entity.MonitoringTask;

public interface JobValidationService {
    void validateJobExecutionInERP(MonitoringTask monitoringTask);
    boolean jobDetailsAreValid(MonitoringTask monitoringTask);
}

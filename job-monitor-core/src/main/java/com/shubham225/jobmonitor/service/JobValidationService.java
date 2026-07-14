package com.shubham225.jobmonitor.service;

import com.shubham225.jobmonitor.model.entity.MonitoringTask;

public interface JobValidationService {
    void validateJobExecutionInERP(MonitoringTask monitoringTask);
    boolean jobDetailsAreValid(MonitoringTask monitoringTask);
}

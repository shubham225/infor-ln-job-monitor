package com.shubham225.service;

import com.shubham225.model.enums.ERPJobStatus;

public interface ExclusionService {
    boolean isJobExcludedFromMonitoringAlert(String hostName, String jobCode, String company);
    boolean isErrorMessageExcludedFromMonitoringAlert(String hostName, String message);
    boolean isJobStatusExcludedFromMonitoringAlert(String hostName, ERPJobStatus status);
}
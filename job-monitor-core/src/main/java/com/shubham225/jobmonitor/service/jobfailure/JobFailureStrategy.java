package com.shubham225.jobmonitor.service.jobfailure;

import com.shubham225.jobmonitor.model.entity.MonitoringTask;

public interface JobFailureStrategy {
    void handleFailureOrSuccess(MonitoringTask task);
}

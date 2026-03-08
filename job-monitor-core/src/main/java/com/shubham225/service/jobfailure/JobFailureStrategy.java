package com.shubham225.service.jobfailure;

import com.shubham225.model.entity.MonitoringTask;

public interface JobFailureStrategy {
    void handleFailureOrSuccess(MonitoringTask task);
}

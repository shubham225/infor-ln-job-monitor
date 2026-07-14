package com.shubham225.jobmonitor.service.jobfailure.strategy;

import com.shubham225.jobmonitor.model.entity.MonitoringTask;
import com.shubham225.jobmonitor.model.enums.MonitoringStatus;
import com.shubham225.jobmonitor.service.jobfailure.JobFailureStrategy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service("SkippedMonitoringAlertStrategy")
@RequiredArgsConstructor
public class SkippedMonitoringAlertStrategy implements JobFailureStrategy {
    @Override
    public void handleFailureOrSuccess(MonitoringTask task) {
        log.info("Job '{}' has been skipped from monitoring alerts.", task.getJob());
        task.setStatus(MonitoringStatus.COMPLETED);
    }
}

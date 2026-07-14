package com.shubham225.jobmonitor.scheduler;

import com.shubham225.jobmonitor.model.entity.MonitoringTask;
import com.shubham225.jobmonitor.service.MonitoringTaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class MonitoringTaskScheduler {
    private final MonitoringTaskService monitorService;

    @Scheduled(fixedDelay = 15000)
    private void doERPJobMonitoring() {
        List<MonitoringTask> tasks = monitorService.findActiveMonitoringTasks();

        if (tasks.isEmpty()) {
            return;
        }

        log.info("{} tasks ready for monitoring", tasks.size());

        tasks.forEach(monitoringTask -> {
            if (monitoringTask.isReadyToPoll()) {
                log.info("validating Job {}.", monitoringTask.getJob());
                monitorService.validateAndNotifyTaskExecution(monitoringTask);
            }
        });

        log.info("validation cycle complete, waiting for next cycle.");
    }

}

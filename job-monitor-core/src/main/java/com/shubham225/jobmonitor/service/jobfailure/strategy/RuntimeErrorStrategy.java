package com.shubham225.jobmonitor.service.jobfailure.strategy;

import com.shubham225.jobmonitor.model.entity.MonitoringTask;
import com.shubham225.jobmonitor.model.enums.MonitoringStatus;
import com.shubham225.jobmonitor.service.NotificationService;
import com.shubham225.jobmonitor.service.jobfailure.JobFailureStrategy;
import com.shubham225.jobmonitor.util.Environments;
import com.shubham225.jobmonitor.util.FileUtils;
import com.shubham225.jobmonitor.util.MailUtils;
import com.shubham225.jobmonitor.windows.event.EventLogClient;
import com.shubham225.jobmonitor.windows.event.domain.EventLogQuery;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;

@Slf4j
@Service("RuntimeErrorStrategy")
@RequiredArgsConstructor
public class RuntimeErrorStrategy implements JobFailureStrategy {
    private final NotificationService notificationService;
    private final EventLogClient eventLogClient;

    @Override
    public void handleFailureOrSuccess(MonitoringTask task) {
        log.error("Job '{}' has been failed with Runtime Errors", task.getJob());

        String jobMonitorHome = Environments.getJobMonitorHome();
        String fileName = FileUtils.evtxWithTimestamp(task.getTaskName());
        Path eventLogPath = Paths.get(jobMonitorHome, fileName);
        int success = eventLogClient.getEventViewerLog(
                new EventLogQuery(
                        "Application",
                        task.getExecutedOn(),
                        task.getTerminatedOn(),
                        eventLogPath)
        );

        String subject = String.format(
                "%s Runtime error in job \"%s\"", MailUtils.getMailSubjectTitle(), task.getJob().getJobCode());
        String errorInfo = "The job encountered a runtime error during execution.";

        String body = notificationService.generateMailBody(task, errorInfo, success == 0);

        task.setMailSent(notificationService.notify(subject, body, Set.of(eventLogPath)));
        task.setStatus(MonitoringStatus.FAILED);

        // Delete event log once logs sent
        try {
            Files.deleteIfExists(eventLogPath);
        } catch (IOException e) {
            log.warn("File may be locked or in use: {}", eventLogPath, e);
        }
    }
}

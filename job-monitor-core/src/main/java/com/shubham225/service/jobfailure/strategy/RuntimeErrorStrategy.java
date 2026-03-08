package com.shubham225.service.jobfailure.strategy;

import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.model.enums.MonitoringStatus;
import com.shubham225.service.NotificationService;
import com.shubham225.service.jobfailure.JobFailureStrategy;
import com.shubham225.util.Environments;
import com.shubham225.util.FileUtils;
import com.shubham225.util.MailUtils;
import com.shubham225.windows.event.EventLogClient;
import com.shubham225.windows.event.domain.EventLogQuery;
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
        int success = eventLogClient.generateEventViewerLog(
                new EventLogQuery(
                        "Application",
                        task.getExecutedOn(),
                        task.getTerminatedOn(),
                        eventLogPath)
        );

        String subject = String.format(
                "%s Runtime error in job \"%s\"", MailUtils.getMailSubjectTitle(), task.getJob().getId().getJobName());
        String errorInfo = "The job encountered a runtime error during execution.";

        String body = notificationService.generateMailBody(task, errorInfo, success == 0);

        task.setMailSent(notificationService.sendMail(subject, body, Set.of(eventLogPath)));
        task.setStatus(MonitoringStatus.FAILED);

        // Delete event log once logs sent
        try {
            Files.deleteIfExists(eventLogPath);
        } catch (IOException e) {
            log.warn("File may be locked or in use: {}", eventLogPath, e);
        }
    }
}

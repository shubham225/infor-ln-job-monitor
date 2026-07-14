package com.shubham225.jobmonitor.service.jobfailure.strategy;

import com.shubham225.jobmonitor.model.entity.MonitoringTask;
import com.shubham225.jobmonitor.model.enums.MonitoringStatus;
import com.shubham225.jobmonitor.service.NotificationService;
import com.shubham225.jobmonitor.service.jobfailure.JobFailureStrategy;
import com.shubham225.jobmonitor.util.MailUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Set;

@Slf4j
@Service("TimeLimitExceededStrategy")
@RequiredArgsConstructor
public class TimeLimitExceededStrategy implements JobFailureStrategy {
    private final NotificationService notificationService;

    @Override
    public void handleFailureOrSuccess(MonitoringTask task) {
        log.error("Job '{}' running for more than expected time in ERP", task.getJob());

        long lapsedTimeInSeconds = Duration.between(task.getExecutedOn(), LocalDateTime.now()).getSeconds();

        String subject = String.format(
                "%s Job \"%s\" exceeded time limit", MailUtils.getMailSubjectTitle(), task.getJob().getJobCode());
        String errorInfo = String.format(
                "The job execution exceeded the configured time limit and has been running for a long time in ERP. " +
                        "Job usually takes '%s' to complete but it's been running for '%s'.",
                formatDuration(task.getJob().getJobAverageRuntimeInSec()),
                formatDuration(lapsedTimeInSeconds));

        String body = notificationService.generateMailBody(task, errorInfo, false);

        task.setMailSent(notificationService.sendMail(subject, body, Set.of()));
        task.setStatus(MonitoringStatus.FAILED);
    }

    private String formatDuration(long seconds) {
        if (seconds < 60) {
            return seconds + " seconds";
        }

        long minutes = seconds / 60;
        if (minutes < 60) {
            long remainingSec = seconds % 60;
            return remainingSec == 0
                    ? minutes + " minutes"
                    : minutes + " minutes " + remainingSec + " seconds";
        }

        long hours = minutes / 60;
        long remainingMin = minutes % 60;
        return remainingMin == 0
                ? hours + " hour"
                : hours + " hour " + remainingMin + " minutes";
    }
}

package com.shubham225.jobmonitor.service.jobfailure.strategy;

import com.shubham225.jobmonitor.model.entity.MonitoringTask;
import com.shubham225.jobmonitor.model.enums.MonitoringStatus;
import com.shubham225.jobmonitor.service.NotificationService;
import com.shubham225.jobmonitor.service.jobfailure.JobFailureStrategy;
import com.shubham225.jobmonitor.util.MailUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Set;

@Slf4j
@Service("PendingStrategy")
@RequiredArgsConstructor
public class PendingStrategy implements JobFailureStrategy {
    private final NotificationService notificationService;

    @Override
    public void handleFailureOrSuccess(MonitoringTask task) {
        log.error("Unknown error occurred while monitoring Job '{}', monitor status is still pending but it executed the monitor", task.getJob());

        String subject = String.format(
                "%s Unknown error occurred monitoring Job \"%s\"", MailUtils.getMailSubjectTitle(), task.getJob().getJobCode());
        String errorInfo = "Unknown error occurred while monitoring Job, Monitor status is still PENDING but it executed the monitor";

        String body = notificationService.generateMailBody(task, errorInfo, false);

        task.setMailSent(notificationService.notify(subject, body, Set.of()));
        task.setStatus(MonitoringStatus.FAILED);
    }
}

package com.shubham225.service.jobfailure.strategy;

import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.model.enums.MonitoringStatus;
import com.shubham225.service.NotificationService;
import com.shubham225.service.jobfailure.JobFailureStrategy;
import com.shubham225.util.MailUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Set;

@Slf4j
@Service("JobDetailsMissingStrategy")
@RequiredArgsConstructor
public class JobDetailsMissingStrategy implements JobFailureStrategy {
    private final NotificationService notificationService;

    @Override
    public void handleFailureOrSuccess(MonitoringTask task) {
        log.error("Job '{}' received from the client app has some details missing", task.getJob());

        String subject = String.format(
                "%s Missing details for job \"%s\"", MailUtils.getMailSubjectTitle(), task.getJob().getId().getJobName());
        String errorInfo = "Required job details received from the client app are incomplete or missing.";

        String body = notificationService.generateMailBody(task, errorInfo, false);

        task.setMailSent(notificationService.sendMail(subject, body, Set.of()));
        task.setStatus(MonitoringStatus.FAILED);
    }
}

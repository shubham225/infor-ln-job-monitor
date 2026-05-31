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
@Service("NotFoundStrategy")
@RequiredArgsConstructor
public class NotFoundStrategy implements JobFailureStrategy {
    private final NotificationService notificationService;

    @Override
    public void handleFailureOrSuccess(MonitoringTask task) {
        log.error("Job '{}' does not exists in ERP", task.getJob());

        String subject = String.format(
                "%s Job \"%s\" not found in ERP system", MailUtils.getMailSubjectTitle(), task.getJob().getJobCode());
        String errorInfo = "The job could not be found in the ERP system.";

        String body = notificationService.generateMailBody(task, errorInfo, false);

        task.setMailSent(notificationService.sendMail(subject, body, Set.of()));
        task.setStatus(MonitoringStatus.FAILED);
    }
}

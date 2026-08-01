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
@Service("CanceledStrategy")
@RequiredArgsConstructor
public class CanceledStrategy implements JobFailureStrategy {
    private final NotificationService notificationService;

    @Override
    public void handleFailureOrSuccess(MonitoringTask task) {
        log.error("Job '{}' has been canceled in ERP", task.getJob());

        String subject = String.format(
                "%s Job \"%s\" was canceled", MailUtils.getMailSubjectTitle(), task.getJob().getJobCode());
        String errorInfo = "The job execution was canceled in the ERP system.";

        String body = notificationService.generateMailBody(task, errorInfo, false);
        task.setMailSent(notificationService.notify(subject, body, Set.of()));
        task.setStatus(MonitoringStatus.FAILED);
    }
}

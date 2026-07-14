package com.shubham225.jobmonitor.service.jobfailure.strategy;

import com.shubham225.jobmonitor.model.entity.MonitoringTask;
import com.shubham225.jobmonitor.model.enums.ERPJobStatus;
import com.shubham225.jobmonitor.model.enums.MonitoringStatus;
import com.shubham225.jobmonitor.service.NotificationService;
import com.shubham225.jobmonitor.service.jobfailure.JobFailureStrategy;
import com.shubham225.jobmonitor.util.MailUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Set;

@Slf4j
@Service("NotExecutedStrategy")
@RequiredArgsConstructor
public class NotExecutedStrategy implements JobFailureStrategy {
    private final NotificationService notificationService;

    @Override
    public void handleFailureOrSuccess(MonitoringTask task) {
        log.error("Job '{}' is not executed in ERP", task.getJob());

        String subject = String.format(
                "%s Job \"%s\" did not execute as scheduled", MailUtils.getMailSubjectTitle(), task.getJob().getJobCode());
        String errorInfo = (task.getJob().getStatus() == ERPJobStatus.FREE) ?
                "The job did not execute as scheduled in the ERP system." :
                String.format(
                        "The job did not execute in ERP as job status is \"%s\"", task.getJob().getStatus().toString());

        String body = notificationService.generateMailBody(task, errorInfo, false);

        task.setMailSent(notificationService.sendMail(subject, body, Set.of()));
        task.setStatus(MonitoringStatus.FAILED);
    }
}

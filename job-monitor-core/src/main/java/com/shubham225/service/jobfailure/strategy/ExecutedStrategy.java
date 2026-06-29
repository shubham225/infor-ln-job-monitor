package com.shubham225.service.jobfailure.strategy;

import com.shubham225.model.dto.ErrorMessageDTO;
import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.model.enums.MonitoringStatus;
import com.shubham225.service.ExclusionService;
import com.shubham225.service.JobService;
import com.shubham225.service.NotificationService;
import com.shubham225.service.jobfailure.JobFailureStrategy;
import com.shubham225.util.MailUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service("ExecutedStrategy")
@RequiredArgsConstructor
public class ExecutedStrategy implements JobFailureStrategy {
    private final JobService jobService;
    private final NotificationService notificationService;
    private final ExclusionService exclusionService;

    @Override
    public void handleFailureOrSuccess(MonitoringTask task) {
        log.info("Job '{}' has been successfully executed in ERP.", task.getJob());

        /* TODO:
            - check history messages for any error keywords if any error found then send mail.
            - also check if task scheduler has been reset to ready if its running wait for some time and send mail for Scheduler running
         */
        String subject = "";
        String errorInfo = "";

        // Error Message captured in ERP
        List<ErrorMessageDTO> errorMessages = jobService.getJobHistoryErrorMessages(task.getJob());

        List<ErrorMessageDTO> filteredMessages = errorMessages.stream()
                .filter(message -> !exclusionService.isErrorMessageExcludedFromMonitoringAlert(
                        task.getJob().getHostName(),
                        message.getMessage()))
                .toList();

        if(!filteredMessages.isEmpty()) {
            subject = String.format(
                    "%s Job \"%s\" completed with error message", MailUtils.getMailSubjectTitle(), task.getJob().getJobCode());
            errorInfo = "The job completed execution with reported error messages.";

            String body = notificationService.generateMailBody(task, errorInfo, false);
            task.setMailSent(notificationService.sendMail(subject, body, Set.of()));
        } else {
            if (!errorMessages.isEmpty()) {
                log.warn("Error messages captured for job {}, but skipped due to message exclusions", task.getJob());
            }
        }

        // Task still running on task Scheduler
        // Sample Mail for Error Task Scheduler Running
        subject = String.format(
                "%s Scheduler task still running for job \"%s\"", MailUtils.getMailSubjectTitle(), task.getJob().getJobCode());
        errorInfo = "The associated Windows Scheduler task is still running.";

        task.setStatus(MonitoringStatus.COMPLETED);
    }
}

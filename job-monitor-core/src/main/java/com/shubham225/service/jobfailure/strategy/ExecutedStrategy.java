package com.shubham225.service.jobfailure.strategy;

import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.model.enums.MonitoringStatus;
import com.shubham225.service.jobfailure.JobFailureStrategy;
import com.shubham225.util.MailUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service("ExecutedStrategy")
@RequiredArgsConstructor
public class ExecutedStrategy implements JobFailureStrategy {
    @Override
    public void handleFailureOrSuccess(MonitoringTask task) {
        log.info("Job '{}' has been successfully executed in ERP.", task.getJob());

        /* TODO:
            - check history messages for any error keywords if any error found then send mail.
            - also check if task scheduler has been reset to ready if its running wait for some time and send mail for Scheduler running
         */
        // Sample Mail for Error Messages
        String subject = String.format(
                "%s Job \"%s\" completed with error message", MailUtils.getMailSubjectTitle(), task.getJob().getJobCode());
        String errorInfo = "The job completed execution with reported error messages.";

        // Sample Mail for Error Task Scheduler Running
        subject = String.format(
                "%s Scheduler task still running for job \"%s\"", MailUtils.getMailSubjectTitle(), task.getJob().getJobCode());
        errorInfo = "The associated Windows Scheduler task is still running.";

        task.setStatus(MonitoringStatus.COMPLETED);
    }
}

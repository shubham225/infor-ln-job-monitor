package com.shubham225.service.jobfailure.strategy;

import com.shubham225.model.dto.ErrorMessageDTO;
import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.model.enums.FailureReason;
import com.shubham225.model.enums.MonitoringStatus;
import com.shubham225.service.ExclusionService;
import com.shubham225.service.JobService;
import com.shubham225.service.NotificationService;
import com.shubham225.service.jobfailure.JobFailureStrategy;
import com.shubham225.util.MailUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

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

        String subject = "";
        String errorInfo = "";
        task.setStatus(MonitoringStatus.COMPLETED);

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
            task.setReason(FailureReason.EXEC_WITH_ERROR_MESSAGE);
            task.setStatus(MonitoringStatus.FAILED);
        } else {
            if (!errorMessages.isEmpty()) {
                log.warn("Error messages captured for job {}, but skipped due to message exclusions", task.getJob());
            }
        }
    }
}

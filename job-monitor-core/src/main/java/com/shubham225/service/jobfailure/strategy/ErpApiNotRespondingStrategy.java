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
@Service("ErpApiNotRespondingStrategy")
@RequiredArgsConstructor
public class ErpApiNotRespondingStrategy implements JobFailureStrategy {
    private final NotificationService notificationService;

    @Override
    public void handleFailureOrSuccess(MonitoringTask task) {
        log.error("ERP Integrator for server '{}' is not responding.", task.getJob().getId().getServer());

        String subject = String.format(
                "%s ERP API for sever \"%s\" is down", MailUtils.getMailSubjectTitle(), task.getJob().getId().getServer());
        String errorInfo = "Unable to retrieve job details due to ERP API unavailability.";

        String body = notificationService.generateMailBody(task, errorInfo, false);

        task.setMailSent(notificationService.sendMail(subject, body, Set.of()));
        task.setStatus(MonitoringStatus.FAILED);
    }
}

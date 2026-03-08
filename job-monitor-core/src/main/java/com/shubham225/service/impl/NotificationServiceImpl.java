package com.shubham225.service.impl;

import com.shubham225.exception.MailNotSentException;
import com.shubham225.mail.MailClient;
import com.shubham225.mail.domain.MailRequest;
import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.service.AppSettingService;
import com.shubham225.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.nio.file.Path;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final AppSettingService appSettingService;
    private final MailClient mailClient;
    private final TemplateEngine templateEngine;

    @Override
    public Boolean sendMail(String subject, String body, Set<Path> attachments) {
        String mailTo = appSettingService.findAppSettings().getMailTo();
        String mailCc = appSettingService.findAppSettings().getMailCc();

        try {
            mailClient.sendEmail(new MailRequest(mailTo, mailCc, subject, body, attachments));
        } catch (MailNotSentException e) {
            log.error("Exception while sending mail: {}", e.getMessage());
            return false;
        }

        return true;
    }

    @Override
    public String generateMailBody(MonitoringTask task, String errorInfo, boolean logsAttached) {
        Context context = new Context();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm a");
        String timeZone = getShortTimeZone();
        String serverHostName = task.getJob().getWinTask().getId().getServer();
        String jobUserDetails = task.getJob().getJobUser() + " [BW Host: " + task.getJob().getId().getServer() + "]";
        String companyDetails = task.getJob().getId().getCompany();

        // Monitor Task Details
        context.setVariable("monitorStatus", task.getStatus().toString());
        context.setVariable("errorType", task.getReason().toString());
        context.setVariable("errorDescription", errorInfo);
        // TODO: update logic to decide if evtx attached
        context.setVariable("evtxAttached", logsAttached);
        context.setVariable("taskTriggerTime",
                task.getExecutedOn() != null ?
                        task.getExecutedOn().format(formatter) + " (" + timeZone + ")" : "N/A");
        context.setVariable("taskTerminationTime",
                task.getTerminatedOn() != null ?
                        task.getTerminatedOn().format(formatter) + " (" + timeZone + ")" : "N/A");

        // Job Details
        context.setVariable("jobName", task.getJob().getId().getJobName());
        context.setVariable("jobDescription", task.getJob().getJobDescription());
        context.setVariable("jobStatus", task.getJob().getStatus().toString());
        context.setVariable("lastExecution",
                task.getJob().getJobStartedAt() != null ?
                        task.getJob().getJobStartedAt().format(formatter) + " (" + timeZone + ")" : "N/A");
        context.setVariable("server", serverHostName);
        context.setVariable("jobUser", jobUserDetails);
        context.setVariable("company", companyDetails);

        // Task Details
        context.setVariable("taskName", task.getJob().getWinTask().getId().getTaskName());
        context.setVariable("taskStatus", task.getJob().getWinTask().getStatus().toString());
        context.setVariable("taskNextRun",
                task.getJob().getWinTask().getNextRuntime() != null ?
                        task.getJob().getWinTask().getNextRuntime().format(formatter) + " (" + timeZone + ")" : "N/A");

        return templateEngine.process("erp_job_alert_mail", context);
    }

    private String getShortTimeZone() {
        return ZonedDateTime.now(ZoneId.systemDefault())
                .format(DateTimeFormatter.ofPattern("z", Locale.ENGLISH));
    }
}

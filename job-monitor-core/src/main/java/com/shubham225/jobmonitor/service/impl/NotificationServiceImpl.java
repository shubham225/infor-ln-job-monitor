package com.shubham225.jobmonitor.service.impl;

import com.shubham225.jobmonitor.exception.MailNotSentException;
import com.shubham225.jobmonitor.mail.MailClient;
import com.shubham225.jobmonitor.mail.domain.MailRequest;
import com.shubham225.jobmonitor.model.entity.AppSetting;
import com.shubham225.jobmonitor.model.entity.MonitoringTask;
import com.shubham225.jobmonitor.service.AppSettingService;
import com.shubham225.jobmonitor.service.NotificationService;
import com.shubham225.jobmonitor.windows.event.EventLogClient;
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
    private final EventLogClient eventLogClient;

    @Override
    public Boolean notify(String subject, String body, Set<Path> attachments) {
        AppSetting configurations = appSettingService.findAppSettings();
        String mailTo = configurations.getMailTo();
        String mailCc = configurations.getMailCc();
        boolean sendAlert = configurations.isEmailAlerts();
        boolean logWindowsEvent = configurations.isLogWindowsEvent();

        if (logWindowsEvent) {
            log.info("Logging windows event for subject {}", subject);
            eventLogClient.addEventViewerLog("Application", "JobMonitor", "error", subject);
        }

        if (mailTo.isBlank()) {
            log.error("Email Recipients are not defined in setting mail not sent");
            return false;
        }

        if (!sendAlert) {
            log.warn("Email Alerts are disabled in application settings");
            return false;
        }

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
        String serverHostName = task.getJob().getWinTask().getHostName();
        String jobUserDetails = task.getJob().getUserId() + " [BW Host: " + task.getJob().getHostName() + "]";
        String companyDetails = task.getJob().getCompany();

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
        context.setVariable("jobName", task.getJob().getJobCode());
        context.setVariable("jobDescription", task.getJob().getDescription());
        context.setVariable("jobStatus", task.getJob().getStatus().toString());
        context.setVariable("lastExecution",
                task.getJob().getJobStartedAt() != null ?
                        task.getJob().getJobStartedAt().format(formatter) + " (" + timeZone + ")" : "N/A");
        context.setVariable("server", serverHostName);
        context.setVariable("jobUser", jobUserDetails);
        context.setVariable("company", companyDetails);

        // Task Details
        context.setVariable("taskName", task.getJob().getWinTask().getTaskName());
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

package com.shubham225.service;

import com.shubham225.model.entity.MonitoringTask;

import java.nio.file.Path;
import java.util.Set;

public interface NotificationService {
    public Boolean sendMail(String subject, String body, Set<Path> attachments);
    public String generateMailBody(MonitoringTask task, String errorInfo, boolean logsAttached);
}

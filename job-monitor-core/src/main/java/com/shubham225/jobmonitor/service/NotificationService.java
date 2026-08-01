package com.shubham225.jobmonitor.service;

import com.shubham225.jobmonitor.model.entity.MonitoringTask;

import java.nio.file.Path;
import java.util.Set;

public interface NotificationService {
    Boolean notify(String subject, String body, Set<Path> attachments);
    String generateMailBody(MonitoringTask task, String errorInfo, boolean logsAttached);
}

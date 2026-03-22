package com.shubham225.windows.event.domain;

import java.nio.file.Path;
import java.time.LocalDateTime;

public record EventLogQuery (
    String logName,            // e.g. "System", "Application"
    LocalDateTime startTime,
    LocalDateTime endTime,
    Path outputFilepath
) {}

package com.shubham225.jobmonitor.windows.scheduler.domain;

public record TaskQuery (
    String taskName,
    String folder
) {}

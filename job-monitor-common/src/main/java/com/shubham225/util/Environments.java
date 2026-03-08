package com.shubham225.util;

import java.util.Optional;

public class Environments {
    final private static String JOB_MONITOR_HOME = Optional.ofNullable(System.getenv("JOB_MONITOR_HOME"))
                                                        .filter(v -> !v.isBlank())
                                                        .orElse("C:\\job-monitor");

    public static String getJobMonitorHome() {
        return JOB_MONITOR_HOME;
    }
}

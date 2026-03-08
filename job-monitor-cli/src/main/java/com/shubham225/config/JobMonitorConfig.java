package com.shubham225.config;

import com.shubham225.constants.JobMonitorConstant;

public class JobMonitorConfig {
    public static String getServerUrl() {
        return getEnvOrDefault("JOB_MONITOR_SERVER_URL", JobMonitorConstant.DEFAULT_SERVER_URL);
    }

    public static String getJobMonitorHome() {
        return getEnvOrDefault("JOB_MONITOR_HOME", JobMonitorConstant.DEFAULT_JOB_MONITOR_HOME);
    }

    public static String getMonitorApiPath() {
        return JobMonitorConstant.DEFAULT_MONITOR_API_PATH;
    }

    public static String getStatusApiPath() {
        return JobMonitorConstant.DEFAULT_STATUS_API_PATH;
    }


    private static String getEnvOrDefault(String key, String defaultValue) {
        String val = System.getenv(key);
        return (val == null || val.isBlank()) ? defaultValue : val;
    }
}

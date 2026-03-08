package com.shubham225.util;

public class MailUtils {
    public static String getMailSubjectTitle(String hostname) {
        String hostName = (HostUtils.getHostName().equals("UNKNOWN-HOST")) ? hostname : HostUtils.getHostName();
        return String.format(
                "Job Monitoring Alert [%s]:", hostName);
    }

    public static String getMailSubjectTitle() {
        String hostName = HostUtils.getHostName();
        return String.format(
                "Job Monitoring Alert [%s]:", hostName);
    }
}

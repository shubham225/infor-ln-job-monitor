package com.shubham225.jobmonitor.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AppSettingDTO {
    private String mailTo;
    private String mailCc;
    private Integer allowedJobStartDelay;
    private boolean emailAlerts;
    private String errorKeywords;
    private boolean sendMonthlyReports;
    private Integer taskReleaseDelay;
    private boolean logWindowsEvent;
}

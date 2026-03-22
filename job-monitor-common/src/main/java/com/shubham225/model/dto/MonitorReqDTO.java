package com.shubham225.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MonitorReqDTO {
    private String jobName;
    private String bseCompany;
    private String bwHostName;
    private String user;
    private String bse;
    private String commandLine;
}

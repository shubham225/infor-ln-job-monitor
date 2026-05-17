package com.shubham225.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MonitorRequestDTO {
    private String jobName;
    private String companyCode;
    private String serverHostName;
    private String user;
    private String applicationServer;
    private String commandLine;
}

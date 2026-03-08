package com.shubham225.erp.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.shubham225.model.enums.ERPJobHistoryStatus;
import com.shubham225.model.enums.ERPJobStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ERPJob {
    private String jobName;
    private String jobCompany;
    private String jobServer;
    private String jobDescription;
    private ERPJobStatus status;
    private ERPJobHistoryStatus historyStatus;
    private String jobUser;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime jobStartedAt;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime jobEndedAt;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime nextJobExecutionAt;
    private Integer jobAverageRuntimeInSec;
    private Boolean notFound;
}

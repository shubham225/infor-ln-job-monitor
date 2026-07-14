package com.shubham225.jobmonitor.erp.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.shubham225.jobmonitor.model.enums.ERPJobHistoryStatus;
import com.shubham225.jobmonitor.model.enums.ERPJobStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class FetchERPJobResponseDTO {
    private String jobCode;
    private String company;
    private String hostDisplayName;
    private String description;
    private ERPJobStatus status;
    private ERPJobHistoryStatus historyStatus;
    private String userId;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime jobStartedAt;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime jobEndedAt;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime nextJobExecutionAt;
    private Integer jobAverageRuntimeInSec;
    private Boolean jobNotFound;
}
package com.shubham225.jobmonitor.model.dto;

import com.shubham225.jobmonitor.model.enums.ERPJobStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExclusionJobStatusDTO {
    private Long id;
    private String hostName;
    private ERPJobStatus status;
}

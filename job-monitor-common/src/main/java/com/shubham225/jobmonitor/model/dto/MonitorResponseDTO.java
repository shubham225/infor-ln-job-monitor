package com.shubham225.jobmonitor.model.dto;

import com.shubham225.jobmonitor.model.enums.MonitoringStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MonitorResponseDTO {
    Long monitorTaskId;
    MonitoringStatus status;
}

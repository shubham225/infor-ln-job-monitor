package com.shubham225.model.dto;

import com.shubham225.model.enums.MonitoringStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class MonitorResponseDTO {
    UUID monitorTaskId;
    MonitoringStatus status;
}

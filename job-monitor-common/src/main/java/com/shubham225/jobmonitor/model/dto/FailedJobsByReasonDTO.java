package com.shubham225.jobmonitor.model.dto;

import com.shubham225.jobmonitor.model.enums.FailureReason;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FailedJobsByReasonDTO {
    private FailureReason reason;
    private Long count;
}
